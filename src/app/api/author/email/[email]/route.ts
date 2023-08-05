import { NextRequest, NextResponse } from 'next/server';

import { FirebaseError } from 'firebase-admin';
import admin from 'lib/firebaseAdminConfig';
import { Author } from 'types/author';

type Context = {
  params: {
    email: string;
  };
};

export async function GET(request: NextRequest, { params }: Context) {
  const response = admin
    .firestore()
    .collection('authors')
    .where('userEmail', '==', params.email)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        return NextResponse.json({ message: 'No results' }, { status: 404 });
      }
      const authorSnapshot = snapshot.docs[0];
      const author = {
        ...authorSnapshot.data(),
        authorId: authorSnapshot.id,
      } as Author;

      return NextResponse.json(author, { status: 200 });
    })
    .catch((error: FirebaseError) => {
      return NextResponse.json({ message: error.message }, { status: 500 });
    });

  return response;
}
