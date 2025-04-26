import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { AuthServerService } from '@/lib/firebase/service/auth/server.service';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: 'Token não fornecido' }, { status: 400 });
    }

    await AuthServerService.verifyIdToken(token);

    const expiresIn = 60 * 60 * 24 * 5;
    const cookieStore = await cookies();

    cookieStore.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: expiresIn,
      path: '/',
      sameSite: 'strict',
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Erro na criação de sessão:', error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Falha na autenticação' },
      { status: 401 },
    );
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();

    cookieStore.delete('session');

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Erro ao encerrar sessão:', error);

    return NextResponse.json({ error: 'Falha ao encerrar sessão' }, { status: 500 });
  }
}
