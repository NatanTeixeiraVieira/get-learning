import { NextRequest, NextResponse } from 'next/server';

import { FirebaseError } from 'firebase-admin';
import admin from 'lib/firebaseAdminConfig';
import { Author } from 'types/author';

type Context = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, { params }: Context) {
  const response = admin
    .firestore()
    .collection('authors')
    .doc(params.id)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return NextResponse.json({ message: 'No results' }, { status: 404 });
      }
      const author = {
        ...doc.data(),
        authorId: doc.id,
      } as Author;

      return NextResponse.json(author, { status: 200 });
    })
    .catch((error: FirebaseError) => {
      console.log(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    });

  return response;
}
