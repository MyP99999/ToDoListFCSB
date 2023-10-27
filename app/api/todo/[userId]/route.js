import connectDB from "@/utils/database";
import Todo from "@/models/todoModel";
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
  const { userId } = params;
  const url = new URL(request.url, `http://${request.headers.host}`);
  const queryParams = new URLSearchParams(url.search);
  const page = parseInt(queryParams.get('page'), 10) || 1;
  const limit = parseInt(queryParams.get('limit'), 10) || 10;
  
  await connectDB();

  const skip = (page - 1) * limit;

  try {
    const todo = await Todo.find({ userId: userId }).skip(skip).limit(Number(limit));
    const totalCount = await Todo.countDocuments({ userId: userId });
    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({ todo, totalPages }, { status: 200 });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
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