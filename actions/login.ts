'use server';
import { signIn } from '@/auth';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import { redirect } from 'next/dist/server/api-utils';
import * as z from 'zod';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Invalid login' };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    return { success: 'Confirmation email sent!' };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid Credentials' };

        case 'CallbackRouteError':
          // @ts-ignore
          if (error?.cause?.err?.code === 'credentials') {
            return { error: 'Invalid Credentials' };
          }
          return { error: 'CallbackRouteError' };

        default:
          return { error: 'Something went wrong...' };
      }
    }

    throw error;
    // return { error: 'Something went very wrong' };
  }
};
