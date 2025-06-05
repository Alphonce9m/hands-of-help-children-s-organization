import { NextResponse } from 'next/server';
import { prisma } from '@/lib/imports';

export async function GET() {
  return NextResponse.json({ message: 'Method not implemented' }, { status: 501 });
}

export async function POST() {
  return NextResponse.json({ message: 'Method not implemented' }, { status: 501 });
} 