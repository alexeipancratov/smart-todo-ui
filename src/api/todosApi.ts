import TodoItem from "../models/TodoItem";
import { handleResponse } from "./apiUtils";
const baseApiUrl = "https://localhost:44388";
const baseUrl = baseApiUrl + "/api/todos/";

export async function getTodoItems(): Promise<TodoItem[]> {
  try {
    const response = await fetch(baseUrl);
    return handleResponse<TodoItem[]>(response);
  } catch (error) {
    throw error;
  }
}

export async function saveTodoItem(todoItem: TodoItem): Promise<TodoItem> {
  try {
    const response = await fetch(baseUrl, {
      method: todoItem.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
      headers: { "content-type": "application/json" },
      body: JSON.stringify(todoItem),
    });
    return handleResponse<TodoItem>(response);
  } catch (error) {
    throw error;
  }
}

export async function deleteTodoItem(todoItemId: string): Promise<string> {
  try {
    const response = await fetch(baseUrl + todoItemId, { method: "DELETE" });
    return handleResponse<string>(response);
  } catch (error) {
    throw error;
  }
}
