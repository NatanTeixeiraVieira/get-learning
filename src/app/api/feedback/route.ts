import { NextRequest, NextResponse } from 'next/server';

import admin from 'lib/firebaseAdminConfig';
import { getCurrentUser } from 'lib/session';
import { z } from 'zod';

export async function PATCH(request: NextRequest) {
  const session = await getCurrentUser();
  if (!session) {
    return NextResponse.json({ message: 'User not allowed' }, { status: 401 });
  }

  const incrementAndDecrement = z.enum(['like', 'dislike']).nullable();

  const validateSearchParamsSchema = z
    .object({
      authorId: z.string().nonempty(),
      postId: z.string().nonempty(),
      increment: incrementAndDecrement,
      decrement: incrementAndDecrement,
    })
    .refine((datas) => datas.increment !== datas.decrement);

  const { searchParams } = new URL(request.url);
  try {
    const urlSearchParams = {
      authorId: searchParams.get('authorId'),
      postId: searchParams.get('postId'),
      increment: searchParams.get('increment'),
      decrement: searchParams.get('decrement'),
    };

    const { authorId, postId, increment, decrement } =
      validateSearchParamsSchema.parse(urlSearchParams);

    const docRef = (collectionName: string, docId: string) =>
      admin.firestore().collection(collectionName).doc(docId);

    const response = docRef('posts', postId)
      .update({
        ...(increment && {
          [increment]: admin.firestore.FieldValue.increment(1),
        }),
        ...(decrement && {
          [decrement]: admin.firestore.FieldValue.increment(-1),
        }),
      })

      .then(async () => {
        const handleLikeAndDislikeLists = async (
          listName: 'like' | 'dislike'
        ) => {
          let removeOrUnionLikeAndDislikeList:
            | 'arrayUnion'
            | 'arrayRemove'
            | null = null;
          if (increment === listName) {
            removeOrUnionLikeAndDislikeList = 'arrayUnion';
          }
          if (decrement === listName) {
            removeOrUnionLikeAndDislikeList = 'arrayRemove';
          }

          if (removeOrUnionLikeAndDislikeList) {
            await docRef('authors', authorId).update({
              [`${listName}dPosts`]:
                admin.firestore.FieldValue[removeOrUnionLikeAndDislikeList](
                  postId
                ),
            });
          }
        };

        Promise.all([
          handleLikeAndDislikeLists('like'),
          handleLikeAndDislikeLists('dislike'),
        ]);

        return NextResponse.json(
          { message: 'feedback sent successfully' },
          {
            status: 200,
          }
        );
      })
      .catch((error) =>
        NextResponse.json(
          { message: error },
          {
            status: 500,
          }
        )
      );
    return response;
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
