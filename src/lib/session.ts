import { signIn, signOut, getSession } from 'next-auth/react';

export const login = async (email: string, password: string) => {
  const result = await signIn('credentials', {
    email,
    password,
    redirect: false,
  });

  if (result?.error) {
    throw new Error(result.error);
  }

  // Get the updated session
  const session = await getSession();
  return session;
};

export const logout = async () => {
  await signOut({ redirect: false });
};

export const getAccessToken = async (): Promise<string | null> => {
  const session = await getSession();
  return (session?.user as any)?.accessToken || null;
};

export const isAuthenticated = async (): Promise<boolean> => {
  const session = await getSession();
  return !!session?.user;
};
