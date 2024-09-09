import { Resend } from 'resend';
import RescheduleConfirmationTemplate from './RescheduleConfirmationTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

interface RescheduleEmailArgs {
  to: string;
  dateTime: Date;
  style: string;
  service: string;
}

export async function sendRescheduleNotificationEmail({
  to,
  dateTime,
  style,
  service,
}: RescheduleEmailArgs) {
  await resend.emails.send({
    from: 'no-reply@lashesstudiobyboochita.com',
    to,
    subject: 'Your Appointment Was Rescheduled',
    react: RescheduleConfirmationTemplate({
      dateTime,
      style,
      service,
    }),
  });
}
