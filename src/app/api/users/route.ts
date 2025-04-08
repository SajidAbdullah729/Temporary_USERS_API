import { NextRequest, NextResponse } from 'next/server';
import { User, users, idCounter,getNextId } from '@/lib/data';

export async function GET() {
  try {
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: { name: string; email: string } = await request.json();

   
    if (!body.name || !body.email) {
      return NextResponse.json({ error: 'Missing name or email' }, { status: 400 });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    
    const newUser: User = {
      id: getNextId(),
      name: body.name,
      email: body.email,
    };


    users.push(newUser);

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

function validateUserData(data: { name: string; email: string }): string | null {
  if (!data.name || !data.email) {
    return 'Name and email are required';
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(data.email)) {
    return 'Invalid email format';
  }

  return null;
}