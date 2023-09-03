import { NextRequest, NextResponse } from 'next/server';

import admin from 'lib/firebaseAdminConfig';
import { getCurrentUser } from 'lib/session';
import { Author } from 'types/author';
import { z } from 'zod';

type Context = {
  params: {
    id: string;
  };
};

export async function PATCH(request: NextRequest, { params }: Context) {
  const session = await getCurrentUser();
  if (!session) {
    return NextResponse.json({ message: 'User not allowed' }, { status: 401 });
  }

  const datasSchema = z.object({
    name: z.string().nonempty(),
    url: z.string().nonempty(),
  });
  const datas: Author['avatar'] = await request.json();

  try {
    const validatedDatas = datasSchema.parse(datas);

    const authorId = params.id;

    const response = admin
      .firestore()
      .collection('authors')
      .doc(authorId)
      .update({
        avatar: validatedDatas,
      })
      .then(() => {
        return NextResponse.json(
          { message: 'avatar photo updated successfully' },
          {
            status: 200,
          }
        );
      })
      .catch(() => {
        return NextResponse.json(
          { message: 'Failed to update the avatar. Please try again later' },
          {
            status: 500,
          }
        );
      });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
