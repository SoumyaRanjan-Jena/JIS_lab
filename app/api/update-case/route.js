import { NextResponse } from 'next/server';
import updateCase from '@/lib/updateCase';

export async function POST( request ) {
    const { searchParams } = new URL(request.url);
    const CIN = searchParams.get('CIN');
    const data = await request.json();
    
    const result = await updateCase(CIN, data);
    return NextResponse.json({ success: true, data: result }, { status: 200 });
}
