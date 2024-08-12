import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password, admin } = await request.json();

    if (typeof email !== 'string' || typeof password !== 'string' || typeof admin !== 'boolean') {
      return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create user in the database
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        admin,
      },
    });

    return NextResponse.json({ message: 'User created successfully', user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
