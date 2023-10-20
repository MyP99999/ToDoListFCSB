import connectDB from "@/utils/database";
import Todo from "@/models/todoModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { todoId } = params;
  console.log(todoId)
  await connectDB();
  const todo = await Todo.findById(todoId);
  return NextResponse.json({ todo }, { status: 200 });
}
