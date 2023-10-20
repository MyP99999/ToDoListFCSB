import connectDB from "@/utils/database";
import Todo from "@/models/todoModel";
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
  const { userId } = params;
  await connectDB();
  const todo = await Todo.find({ userId: userId });
  console.log(todo)
  return NextResponse.json({ todo }, { status: 200 });
}