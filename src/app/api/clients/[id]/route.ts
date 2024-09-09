import _ from 'lodash';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../prisma/client';

interface Props {
  params: { id: string };
}

export async function PATCH(req: NextRequest, { params: { id } }: Props) {
  const body = await req.json();

  const trimmedData = {
    firstName: body.firstName.trim(),
    lastName: body.lastName.trim(),
    email: body.email.trim(),
    phone: body.phone.trim(),
  };

  const client = await prisma.user.findFirst({
    where: { id },
  });

  if (!client)
    return NextResponse.json(
      { error: 'Client does not exist.' },
      { status: 404 }
    );

  if (client.email !== body.email) {
    const userWithSameEmail = await prisma.user.findFirst({
      where: { email: body.email, id: { not: client.id } },
    });

    if (userWithSameEmail)
      return NextResponse.json(
        { error: 'Email is already in use.' },
        { status: 409 }
      );
  }

  try {
    const updatedClient = await prisma.user.update({
      where: { id },
      data: trimmedData,
    });
    return NextResponse.json(
      {
        data: _.pick(updatedClient, [
          'email',
          'firstName',
          'lastName',
          'phone',
        ]),
      },

      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(
      { error: 'An unexpected error occured.' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params: { id } }: Props) {
  const client = await prisma.user.findFirst({ where: { id } });

  if (!client)
    return NextResponse.json({ error: 'Invalid client.' }, { status: 400 });

  if (client.isAdmin)
    return NextResponse.json(
      { error: 'Admin user cannot be deleted.' },
      { status: 400 }
    );

  try {
    const deletedClient = await prisma.user.delete({ where: { id } });
    return NextResponse.json({ id: deletedClient.id }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(
      { error: 'An unexpected error occured.' },
      { status: 500 }
    );
  }
}
