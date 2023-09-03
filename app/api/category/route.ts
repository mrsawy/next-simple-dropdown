import categories from "../Categories.json";
import { NextResponse } from 'next/server'


export async function GET() {
  return NextResponse.json(categories, { status: 200 })
}
