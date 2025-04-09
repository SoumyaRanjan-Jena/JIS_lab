//app/api/view-cases/route.js
import { NextResponse } from 'next/server';
import getCases from '@/lib/getCases';

export async function GET( request ) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const data = searchParams.get('data');
    
    const cases = await getCases(type, data);
    return NextResponse.json(cases);
}
