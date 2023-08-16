import { NextRequest, NextResponse } from 'next/server';

import { FirebaseError } from 'firebase-admin';
import admin from 'lib/firebaseAdminConfig';
import { getCurrentUser } from 'lib/session';
import { Post } from 'types/post';
import slugGenerator from 'utils/slugGenerator';
import { validatePostToSendSchema } from 'utils/validations';
import { z } from 'zod';

type Context = {
  params: {
    id: string;
  };
};

type DataReceived = z.infer<typeof validatePostToSendSchema>;

export async function GET(request: NextRequest, { params }: Context) {
  const response = admin
    .firestore()
    .collection('posts')
    .doc(params.id)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return NextResponse.json({ message: 'No results' }, { status: 404 });
      }
      const post = {
        ...doc.data(),
        postId: doc.id,
      } as Post;

      return NextResponse.json(post, { status: 200 });
    })
    .catch((error: FirebaseError) => {
      console.log(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    });

  return response;
}

export async function DELETE(request: NextRequest, { params }: Context) {
  const session = await getCurrentUser();
  if (!session) {
    return NextResponse.json({ message: 'User not allowed' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const coverImageName = searchParams.get('coverImage');
  const postId = params.id;
  if (coverImageName && postId) {
    return admin
      .firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(async () => {
        try {
          await admin
            .storage()
            .bucket(process.env.FIREBASE_BUCKET)
            .file(`coverImage/${coverImageName}`)
            .delete();
          return NextResponse.json(
            { message: 'Deleted soccessfull' },
            { status: 200 }
          );
        } catch (error) {
          return NextResponse.json(
            { message: 'Deleted soccessfull' },
            { status: 200 }
          );
        }
      })
      .catch((error) => {
        console.log(error);
        return NextResponse.json({ message: 'Delete failed' }, { status: 500 });
      });
  }
  return NextResponse.json({ message: 'Delete failed' }, { status: 500 });
}

export async function PATCH(request: NextRequest, { params }: Context) {
  const session = await getCurrentUser();
  if (!session) {
    return NextResponse.json({ message: 'User not allowed' }, { status: 401 });
  }

  const datas: DataReceived = await request.json();
  try {
    const postId = params.id;
    const validatedDatas = validatePostToSendSchema.parse(datas);
    const tags =
      validatedDatas.tags.length > 0
        ? validatedDatas.tags.map((tag) => ({
            name: tag,
            slug: slugGenerator(tag ?? '', true),
          }))
        : [];
    const postToUpdate = {
      authorId: validatedDatas.authorId,
      coverImage: validatedDatas.coverImage,
      excerpt: validatedDatas.excerpt,
      allowComents: validatedDatas.allowComents,
      category: {
        name: validatedDatas.category,
        slug: slugGenerator(validatedDatas.category, true),
      },
      title: validatedDatas.title,
      content: validatedDatas.content,
      tags,
      createdAt: Date.now(),
    };
    const response = admin
      .firestore()
      .collection('posts')
      .doc(postId)
      .update(postToUpdate)
      .then(() => {
        return NextResponse.json(
          { message: 'successfully updated' },
          {
            status: 200,
          }
        );
      })
      .catch(() => {
        return NextResponse.json(
          { message: 'Failed to update the post. Please try again later' },
          {
            status: 500,
          }
        );
      });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
