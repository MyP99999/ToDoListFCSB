import connectDB from "@/utils/database";
import Todo from "@/models/todoModel";
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
  const { userId } = params;
  await connectDB();
  const todo = await Todo.find({ userId: userId });
  return NextResponse.json({ todo }, { status: 200 });
}

export async function GET_TODO_BY_ID(request, { params }) {
  const { todoId } = params;
  await connectDB();
  const todo = await Todo.findById({ todoId });
  return NextResponse.json({ todo }, { status: 200 });
}

export const PUT = async (
  req,
  { params }
) => {
  const { userId } = params;
  await connectDB();
  console.log(userId)
  try {
    const body = await req.json();

    await Todo.updateOne({ _id: userId }, { status: body.status });

    return new NextResponse(
      JSON.stringify({ message: "Todo has been updated!" }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};