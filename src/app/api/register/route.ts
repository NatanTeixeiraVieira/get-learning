import { NextRequest, NextResponse } from 'next/server';

import { FirebaseError } from 'firebase-admin';
import admin, { getAuth } from 'lib/firebaseAdminConfig';
import { RegisterDatas } from 'types/register';
import slugGenerator from 'utils/slugGenerator';
import { registerFormSchema } from 'utils/validations';

export async function POST(request: NextRequest) {
  const data: RegisterDatas = await request.json();

  try {
    const validatedData = registerFormSchema.parse(data);
    const { userName, email, password } = validatedData;

    return await getAuth()
      .createUser({
        email,
        password,
      })
      .then(async (userRecord) => {
        console.log(userRecord);
        return await admin
          .firestore()
          .collection('authors')
          .add({
            userId: userRecord.uid,
            name: userName,
            userEmail: email,
            slug: slugGenerator(userName, true),
          })
          .then(() => {
            return NextResponse.json(
              { message: 'User created successful' },
              {
                status: 201,
              }
            );
          })
          .catch((error: FirebaseError) => {
            return NextResponse.json(
              { message: error.message },
              {
                status: 500,
              }
            );
          });
      })
      .catch((error: FirebaseError) => {
        return NextResponse.json(
          { message: error.message },
          {
            status: 500,
          }
        );
      });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to complete sign up' },
      { status: 500 }
    );
  }
}
