import connectDB from "@/utils/database";
import Todo from "@/models/todoModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { todoId } = params;
    await connectDB();
    const todo = await Todo.findById(todoId);
    return NextResponse.json({ todo }, { status: 200 });
}

export async function PUT(request, { params }) {
    const { todoId } = params;
    console.log(todoId)

    const { newTitle: title, newDescription: description, newEndDate: endDate, newStatus: status } = await request.json();
    console.log(title)
    await connectDB();
    try {
        await Todo.findByIdAndUpdate(todoId, { title, description, endDate, status });
        return NextResponse.json({ message: "Todo updated" }, { status: 200 });
    } catch (error) {
        console.error("Error updating Todo:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}