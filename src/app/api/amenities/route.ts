import { wordPressAmenities } from '@/mocks/amenities';
import { NextResponse } from 'next/server';

export async function GET() {
	return NextResponse.json(wordPressAmenities);
}
