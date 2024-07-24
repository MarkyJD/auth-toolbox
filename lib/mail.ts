import EmailTemplate from '@/components/auth/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
  email: string,
  token: string,
  name: string
) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: 'Auth <onboarding@resend.dev>',
    to: email,
    subject: 'Confirm your email',
    react: EmailTemplate({ name, confirmLink }),
  });
};
