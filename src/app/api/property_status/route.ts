import { wordPressPropertyStatus } from '@/mocks/property-status';
import { NextResponse } from 'next/server';

export async function GET() {
	return NextResponse.json(wordPressPropertyStatus);
}
