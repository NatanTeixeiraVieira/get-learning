import { NextRequest, NextResponse } from 'next/server';

import { postsPerRequest } from 'constants/api';
import { FirebaseError } from 'firebase-admin';
import admin from 'lib/firebaseAdminConfig';
import { Post } from 'types/post';
import getSearchParamsStartAfter from 'utils/getSearchParamsStartAfter';

export async function GET(request: NextRequest) {
  const startAfter = getSearchParamsStartAfter(request);
  const response = admin
    .firestore()
    .collection('posts')
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
