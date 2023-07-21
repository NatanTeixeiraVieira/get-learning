import { NextRequest, NextResponse } from 'next/server';

import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from 'lib/firebaseConfig';

type Context = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, { params }: Context) {
  const postsPerRequest = 24;
  const postsCollectionRef = collection(db, 'posts');
  const q = query(
    postsCollectionRef,
    where('author.id', '==', params.id),
    orderBy('createdAt', 'desc'),
    limit(postsPerRequest)
  );
  try {
    const authorPostsSnap = await getDocs(q);
    if (authorPostsSnap.empty) {
      return new NextResponse('No results', { status: 404 });
    }

    const authorPosts = authorPostsSnap.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return new NextResponse(JSON.stringify(authorPosts), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 500,
    });
  }
}
