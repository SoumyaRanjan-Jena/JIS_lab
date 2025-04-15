import { NextResponse } from 'next/server';
import addNewUser from '@/lib/addNewUser';

export async function POST( request ) {
    const data = await request.json();
    
    const result = await addNewUser(data);
    if(result === -1) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }
    return NextResponse.json({ success: true, data: result }, { status: 200 });
}
