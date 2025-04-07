import { NextResponse } from 'next/server';
import addNewCase from '@/lib/addNewCase';

export async function POST( request ) {
    const data = await request.json();
    
    const result = await addNewCase(data);
    return NextResponse.json({ success: true, data: result }, { status: 200 });
}
