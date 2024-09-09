import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../prisma/client';

interface Props {
  params: { styleId: string };
}

export async function PATCH(req: NextRequest, { params: { styleId } }: Props) {
  const body = await req.json();

  const id = parseInt(styleId);

  const service = await prisma.service.findFirst({
    where: { id },
  });

  if (!service)
    return NextResponse.json({ error: 'Invalid style.' }, { status: 404 });

  try {
    const updatedStyle = await prisma.style.update({
      where: { id },
      data: {
        name: body.name,
        description_en: body.description_en,
        description_fi: body.description_fi,
        imageUrl: body.imageId,
      },
    });
    return NextResponse.json({ id: updatedStyle.id }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(
      { error: 'An unexpected error occured.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params: { styleId } }: Props
) {
  const id = parseInt(styleId);

  const style = await prisma.style.findFirst({
    where: { id },
  });

  if (!style)
    return NextResponse.json({ error: 'Invalid service.' }, { status: 404 });

  try {
    const deletedStyle = await prisma.style.delete({
      where: { id },
    });
    return NextResponse.json({ id: deletedStyle.id }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(
      { error: 'An unexpected error occured.' },
      { status: 500 }
    );
  }
}
