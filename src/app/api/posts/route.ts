import { NextResponse } from 'next/server';

import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from 'lib/firebaseConfig';

export async function GET() {
  const postsPerRequest = 24;
  const postsCollectionRef = collection(db, 'posts');
  const q = query(
    postsCollectionRef,
    orderBy('createdAt', 'desc'),
    limit(postsPerRequest)
  );

  try {
    const postsSnap = await getDocs(q);
    if (postsSnap.empty) {
      return new NextResponse('No results', { status: 404 });
    }

    const posts = postsSnap.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return new NextResponse(JSON.stringify(posts), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 500,
    });
  }
}
