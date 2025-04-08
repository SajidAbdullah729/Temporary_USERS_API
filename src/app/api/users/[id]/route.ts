import { NextRequest, NextResponse } from 'next/server';
import { User, users } from '@/lib/data';

// Simple regex for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// GET - Retrieve a user by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params; // Directly extract id from params (no need to await)
  const user = users.find((u) => u.id === parseInt(id));

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  return NextResponse.json(user);
}

// PUT - Update an existing user by ID
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params; // Directly extract id from params (no need to await)
  const parsedId = parseInt(id);
  const body = await request.json();

  // Basic validation: Ensure name and email are present and valid
  if (!body.name || body.name.trim() === '') {
    return NextResponse.json({ error: 'Name is required and cannot be empty' }, { status: 400 });
  }

  if (!body.email || !emailRegex.test(body.email)) {
    return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
  }

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

// DELETE - Delete a user by ID
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params; // Directly extract id from params (no need to await)
  const parsedId = parseInt(id);
  const index = users.findIndex((u) => u.id === parsedId);

  if (index === -1) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  users.splice(index, 1);
  return NextResponse.json({ message: 'User deleted successfully' });
}
