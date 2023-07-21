import { NextRequest, NextResponse } from 'next/server';

import { doc, getDoc } from 'firebase/firestore';
import { db } from 'lib/firebaseConfig';

type Context = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, { params }: Context) {
  const postRef = doc(db, 'posts', params.id);
  try {
    const postSnap = await getDoc(postRef);
    if (!postSnap.exists()) {
      return new NextResponse('No results', { status: 404 });
    }

    const post = { ...postSnap.data(), id: postSnap.id };
    return new NextResponse(JSON.stringify(post), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 500,
    });
  }
}
