import { Language } from '@/providers/language/LanguageProvider';
import { Resend } from 'resend';
import ConfirmationTemplateEn from './ConfirmationTemplateEn';
import ConfirmationTemplateFi from './ConfirmationTemplateFi';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ConfirmationEmailArgs {
  language: Language;
  to: string;
  dateTime: Date;
  style: string;
  service: string;
}

export async function sendBookingConfirmationEmail({
  language,
  to,
  dateTime,
  style,
  service,
}: ConfirmationEmailArgs) {
  const template =
    language === 'en'
      ? ConfirmationTemplateEn({
          dateTime,
          style,
          service,
        })
      : ConfirmationTemplateFi({
          dateTime,
          style,
          service,
        });

  await resend.emails.send({
    from: 'no-reply@lashesstudiobyboochita.com',
    to,
    subject: 'Lashes Studio by Boochita',
    react: template,
  });
}
