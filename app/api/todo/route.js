import connectDB from "@/utils/database";
import Todo from "@/models/todoModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, description, userId, endDate, status } = await request.json();
  await connectDB();
  await Todo.create({ title, description, userId, endDate, status });
  return NextResponse.json({ message: "Todo Created" }, { status: 201 });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectDB();
  await Todo.findByIdAndDelete(id);
  return NextResponse.json({ message: "Todo deleted" }, { status: 200 });
}