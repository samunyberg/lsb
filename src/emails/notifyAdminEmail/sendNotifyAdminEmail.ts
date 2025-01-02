import { formatDate, formatTime } from '@/lib/utils/dateAndTimeUtils';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ConfirmationEmailArgs {
  clientName: string;
  dateTime: Date;
  style: string;
  service: string;
}

export async function sendNotifyAdminEmail({
  clientName,
  dateTime,
  style,
  service,
}: ConfirmationEmailArgs) {
  await resend.emails.send({
    from: 'no-reply@lashesstudiobyboochita.com',
    to: process.env.ADMIN_EMAIL!,
    subject: 'Lashes Studio by Boochita',
    html: `
    <p>${clientName} just booked an appointment:</p>
    <p>Date: ${formatDate(new Date(dateTime), 'en-FI')}</p>
    <p>Time: ${formatTime(new Date(dateTime), 'en-FI')}</p>
    <p>Style: ${style}</p>
    <p>Service: ${service}</p>
    `,
  });
}
