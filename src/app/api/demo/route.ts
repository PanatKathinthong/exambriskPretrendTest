import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const petName = searchParams.get("petName");

  try {
    if (!petName) throw new Error("Pet and owner names required");
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  const pets = {};
  return NextResponse.json({ pets }, { status: 200 });
}
