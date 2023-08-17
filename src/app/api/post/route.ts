import { NextRequest, NextResponse } from 'next/server';

import admin from 'lib/firebaseAdminConfig';
import { getCurrentUser } from 'lib/session';
import slugGenerator from 'utils/slugGenerator';
import { validatePostToSendSchema } from 'utils/validations';
import { z } from 'zod';

type DataReceived = z.infer<typeof validatePostToSendSchema>;

export async function POST(request: NextRequest) {
  const session = await getCurrentUser();
  if (!session) {
    return NextResponse.json({ message: 'User not allowed' }, { status: 401 });
  }

  const datas: DataReceived = await request.json();
  try {
    const validatedDatas = validatePostToSendSchema.parse(datas);
    const tags =
      validatedDatas.tags.length > 0
        ? validatedDatas.tags.map((tag) => ({
            name: tag,
            slug: slugGenerator(tag ?? '', true),
          }))
        : [];
    const postToSend = {
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
      .add(postToSend)
      .then(() => {
        return NextResponse.json(
          { message: 'successfully added' },
          {
            status: 201,
          }
        );
      })
      .catch(() => {
        return NextResponse.json(
          { message: 'Failed to send the post. Please try again later' },
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
