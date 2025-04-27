import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = new Set(['/login']);

async function isValidToken(token: string, request: NextRequest): Promise<boolean> {
  const url = new URL('/api/auth/verify-token', request.url);
  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.ok;
}

function redirect(path: string, request: NextRequest) {
  const to = new URL(path, request.url);
  return NextResponse.redirect(to);
}

function redirectToLoginAndClear(request: NextRequest) {
  const res = redirect('/login', request);
  res.cookies.delete('session');
  return res;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get('session')?.value;

  if (!session) {
    if (PUBLIC_ROUTES.has(pathname)) {
      return NextResponse.next();
    }
    return redirect('/login', request);
  }

  if (PUBLIC_ROUTES.has(pathname) || pathname === '/') {
    return redirect('/dashboard', request);
  }

  try {
    if (await isValidToken(session, request)) {
      return NextResponse.next();
    }
    throw new Error('Token inválido');
  } catch (err) {
    console.error('Falha ao validar token:', err);
    return redirectToLoginAndClear(request);
  }
}

export const config = {
  matcher: ['/', '/login', '/dashboard'],
};
