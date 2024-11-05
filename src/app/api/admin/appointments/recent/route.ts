import { authOptions } from '@/lib/auth';
import { getRecentlyBookedAppointments } from '@/lib/db/appointments';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!session.user.isAdmin)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const appointments = await getRecentlyBookedAppointments();
    return NextResponse.json(appointments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong.' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
