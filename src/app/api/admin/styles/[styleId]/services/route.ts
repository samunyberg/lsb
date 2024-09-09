import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../../prisma/client';

interface Props {
  params: { styleId: string };
}

export async function POST(req: NextRequest, { params: { styleId } }: Props) {
  const body = await req.json();

  const id = parseInt(styleId);

  const existingService = await prisma.service.findFirst({
    where: { styleId: id, name_en: body.name_en },
  });

  if (existingService)
    return NextResponse.json(
      { error: 'This option already exists' },
      { status: 409 }
    );

  try {
    const service = await prisma.service.create({
      data: {
        styleId: id,
        name_en: body.name_en,
        name_fi: body.name_fi,
        description_en: body.description_en,
        description_fi: body.description_fi,
        price: body.price,
      },
    });
    return NextResponse.json({ id: service.id }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(
      { error: 'An unexpected error occured.' },
      { status: 500 }
    );
  }
}
