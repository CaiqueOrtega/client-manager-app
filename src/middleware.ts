import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('session')?.value;
  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/dashboard'];
  const publicRoutes = ['/login'];

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const apiUrl = new URL('/api/auth/verify-token', request.url);
      const verifyResponse = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });

      if (!verifyResponse.ok) {
        throw new Error('Token inválido');
      }

      return NextResponse.next();
    } catch (error) {
      console.error('Erro ao verificar token:', error);
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('session');
      return response;
    }
  }

  return NextResponse.next();
}
