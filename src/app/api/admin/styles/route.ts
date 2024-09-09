import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../prisma/client';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const existingStyle = await prisma.style.findFirst({
    where: { name: body.name },
  });

  if (existingStyle)
    return NextResponse.json(
      { error: 'This style already exists' },
      { status: 409 }
    );

  try {
    const style = await prisma.style.create({
      data: {
        name: body.name,
        description_en: body.description_en,
        description_fi: body.description_fi,
        imageUrl: body.imageId,
      },
    });
    return NextResponse.json({ id: style.id }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(
      { error: 'An unexpected error occured.' },
      { status: 500 }
    );
  }
}
