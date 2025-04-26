import { AuthServerService } from '@/lib/firebase/service/auth/server.service';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 });
  }

  try {
    await AuthServerService.verifyIdToken(token);
    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }
}
