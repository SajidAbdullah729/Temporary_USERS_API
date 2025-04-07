import { NextRequest, NextResponse } from 'next/server';
import { User, users, idCounter,getNextId } from '@/lib/data';

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.name || !body.email) {
    return NextResponse.json({ error: 'Missing name or email' }, { status: 400 });
  }

  const newUser: User = {
    id: getNextId(),
    name: body.name,
    email: body.email,
  };

  users.push(newUser);

  return NextResponse.json(newUser, { status: 201 });
}
