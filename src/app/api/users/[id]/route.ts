import { NextRequest, NextResponse } from 'next/server';
import { User, users } from '@/lib/data';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // Wait for params to resolve
  const { id } = await params; // Await the params here
  const user = users.find((u) => u.id === parseInt(id));

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  return NextResponse.json(user);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  // Wait for params to resolve
  const { id } = await params; // Await the params here
  const parsedId = parseInt(id);
  const body = await request.json();
  const index = users.findIndex((u) => u.id === parsedId);

  if (index === -1) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const updatedUser: User = {
    ...users[index],
    name: body.name ?? users[index].name,
    email: body.email ?? users[index].email,
  };

  users[index] = updatedUser;
  return NextResponse.json(updatedUser);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  // Wait for params to resolve
  const { id } = await params; // Await the params here
  const parsedId = parseInt(id);
  const index = users.findIndex((u) => u.id === parsedId);

  if (index === -1) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  users.splice(index, 1);
  return NextResponse.json({ message: 'User deleted successfully' });
}
