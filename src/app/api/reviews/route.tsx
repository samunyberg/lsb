import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface RequestBody {
  stars: string;
  name: string;
  text: string;
}

export async function POST(req: NextRequest) {
  const { stars, name, text }: RequestBody = await req.json();

  try {
    const review = await prisma.review.create({
      data: {
        stars: parseInt(stars),
        name: name.trim(),
        text: text.trim(),
        status: 'PENDING',
      },
    });

    await resend.emails.send({
      from: 'no-reply@lashesstudiobyboochita.com',
      to: process.env.ADMIN_EMAIL!,
      subject: 'New Review Pending Approval',
      html: `<p>A new review has been submitted by ${name}:</p>
             <p>${text}</p>
             <p><a href="https://yourapp.com/admin/approve-review?id=${review.id}">Click here to approve the review</a></p>`,
    });

    return NextResponse.json(
      { message: 'Review submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Error submitting the review' });
  }
}
