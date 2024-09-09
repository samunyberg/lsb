import { Language } from '@/providers/language/LanguageProvider';
import { Resend } from 'resend';
import PasswordResetTemplateEn from './PasswordResetTemplateEn';
import PasswordResetTemplateFi from './PasswordResetTemplateFi';

const resend = new Resend(process.env.RESEND_API_KEY);

interface PasswordResetEmailArgs {
  language: Language;
  to: string;
  resetUrl: string;
}

export async function sendResetEmail({
  language,
  to,
  resetUrl,
}: PasswordResetEmailArgs) {
  const template =
    language === 'en'
      ? PasswordResetTemplateEn({ resetUrl })
      : PasswordResetTemplateFi({ resetUrl });

  const message = {
    from: 'no-reply@lashesstudiobyboochita.com',
    to,
    subject: 'Lashes Studio by Boochita',
    react: template,
  };

  await resend.emails.send(message);
}
