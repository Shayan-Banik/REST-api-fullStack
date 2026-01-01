"use server";
import { connectToDatabase } from "@/lib/db";
import todoModel from "@/models/todo.model";
import { createTodoSchema } from "@/validation/todo.validation";
import { revalidatePath } from "next/cache";

export const createTodo = async (data) => {
  try {
    await connectToDatabase();
    const { title, description, priority } = createTodoSchema.parse(data);
    const todo = await todoModel.create({ title, description, priority });
    revalidatePath("/");
    return {
      success: true,
      data: JSON.parse(JSON.stringify(todo)),
    };
  } catch (error) {
    console.error("Error creating todo:", error);
    return { success: false, error: error.message || "Error to create todo" };
  }
};
