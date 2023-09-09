import { NextRequest, NextResponse } from 'next/server';

import admin from 'lib/firebaseAdminConfig';
import { getCurrentUser } from 'lib/session';
import { Author } from 'types/author';
import slugGenerator from 'utils/slugGenerator';
import { accountInfosSchema } from 'utils/validations';

type Context = {
  params: {
    id: string;
  };
};

type Datas = {
  name: Author['name'];
  description: Author['description'];
};

export async function PATCH(request: NextRequest, { params }: Context) {
  const session = await getCurrentUser();
  if (!session) {
    return NextResponse.json({ message: 'User not allowed' }, { status: 401 });
  }

  const datas: Datas = await request.json();

  try {
    const validatedDatas = accountInfosSchema.parse(datas);

    const authorId = params.id;

    const response = admin
      .firestore()
      .collection('authors')
      .doc(authorId)
      .update({
        ...validatedDatas,
        slug: slugGenerator(validatedDatas.name, true),
      })
      .then(() => {
        return NextResponse.json(
          { message: `information updated successfully` },
          {
            status: 200,
          }
        );
      })
      .catch(() => {
        return NextResponse.json(
          { message: 'Failed to update information. Please try again later' },
          {
            status: 500,
          }
        );
      });
    return response;
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
