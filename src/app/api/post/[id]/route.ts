import { NextRequest, NextResponse } from 'next/server';

import { FirebaseError } from 'firebase-admin';
import admin from 'lib/firebaseAdminConfig';
import { Post } from 'types/post';

type Context = {
  params: {
    id: string;
  };
};

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
