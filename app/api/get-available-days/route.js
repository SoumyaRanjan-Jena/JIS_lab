import { NextResponse } from 'next/server';
import getAvailableDays from '@/lib/getAvailableDays';

export async function GET( request ) {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    
    const availDays = await getAvailableDays(year, month);
    return NextResponse.json(availDays);
}
