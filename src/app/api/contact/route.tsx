import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface RequestBody {
  name: string;
  email: string;
  message: string;
}

export async function POST(req: NextRequest) {
  const { name, email, message }: RequestBody = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json(
      { message: 'All fields are required.' },
      { status: 400 }
    );
  }

  const trimmedData = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  };

  try {
    await resend.emails.send({
      from: 'no-reply@lashesstudiobyboochita.com',
      to: process.env.ADMIN_EMAIL!,
      subject: `Contact form submission from ${trimmedData.name}`,
      html: `<p>You have a new contact form submission:</p>
              <p><strong>Name:</strong> ${trimmedData.name}</p>
              <p><strong>Email:</strong> ${trimmedData.email}</p>
              <p><strong>Message:</strong> ${trimmedData.message}</p>`,
    });
    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Email could not be sent' },
      { status: 500 }
    );
  }
}
