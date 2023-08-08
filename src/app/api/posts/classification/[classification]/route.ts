import { NextRequest, NextResponse } from 'next/server';

import { postsPerRequest } from 'constants/api';
import { FirebaseError } from 'firebase-admin';
import admin from 'lib/firebaseAdminConfig';
import { Post } from 'types/post';
import getSearchParamsStartAfter from 'utils/getSearchParamsStartAfter';

type Context = {
  params: {
    classification: 'tags' | 'category';
  };
};

export async function GET(request: NextRequest, { params }: Context) {
  const { searchParams } = new URL(request.url);
  const startAfter = getSearchParamsStartAfter(request);

  const opStr = params.classification === 'tags' ? 'array-contains' : '==';

  const response = admin
    .firestore()
    .collection('posts')
    .where(params.classification, opStr, {
      name: searchParams.get('name'),
      slug: searchParams.get('slug'),
    })
    .orderBy('createdAt', 'desc')
    .startAfter(startAfter)
    .limit(postsPerRequest)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        return NextResponse.json({ message: 'No results' }, { status: 404 });
      }
      const posts = snapshot.docs.map(
        (doc) =>
          ({
            ...doc.data(),
            postId: doc.id,
          } as Post)
      );
      return NextResponse.json(posts, { status: 200 });
    })
    .catch((error: FirebaseError) => {
      return NextResponse.json({ message: error.message }, { status: 500 });
    });

  return response;
}
