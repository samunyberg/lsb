import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../../../prisma/client';

interface Props {
  params: { styleId: string; serviceId: string };
}

export async function PATCH(
  req: NextRequest,
  { params: { serviceId } }: Props
) {
  const body = await req.json();

  const id = parseInt(serviceId);

  const service = await prisma.service.findFirst({
    where: { id },
  });

  if (!service)
    return NextResponse.json({ error: 'Invalid service.' }, { status: 404 });

  try {
    const service = await prisma.service.update({
      where: { id },
      data: {
        name_en: body.name_en,
        name_fi: body.name_fi,
        description_en: body.description_en,
        description_fi: body.description_fi,
        price: body.price,
      },
    });
    return NextResponse.json({ data: service }, { status: 200 });
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
  { params: { serviceId } }: Props
) {
  const id = parseInt(serviceId);

  const service = await prisma.service.findFirst({
    where: { id },
  });

  if (!service)
    return NextResponse.json({ error: 'Invalid service.' }, { status: 404 });

  try {
    const deletedService = await prisma.service.delete({
      where: { id },
    });
    return NextResponse.json({ id: deletedService.id }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(
      { error: 'An unexpected error occured.' },
      { status: 500 }
    );
  }
}
