import { getTodaysAppointments } from '@/lib/db/appointments';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_req: NextRequest) {
  try {
    const appointments = await getTodaysAppointments();
    return NextResponse.json(appointments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong.' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
