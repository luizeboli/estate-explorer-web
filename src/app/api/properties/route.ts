import { wordPressProperties } from '@/mocks/properties';
import { NextResponse } from 'next/server';

export async function GET() {
	return NextResponse.json(wordPressProperties);
}
