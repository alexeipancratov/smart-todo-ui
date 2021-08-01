import { useState, useEffect } from "react";
import { getTodoItems } from "../../api/todosApi";
import TodoItem from "../../models/TodoItem";
import ActiveTodoItem from "./ActiveTodoItem";
import AddTodo from "./AddTodo";

export default function TodosPage() {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);

  useEffect(() => {
    getTodoItems().then((todos) => setTodoItems(todos));
  }, []);

  return (
    <>
      <h3>Manage Todos</h3>
      <AddTodo />
      {todoItems
        .filter((i) => !i.isCompleted)
        .map((i) => (
          <ActiveTodoItem key={i.id} item={i} />
        ))}
      <h4>Completed tasks</h4>
      {todoItems
        .filter((i) => i.isCompleted)
        .map((i) => (
          <span className="text-decoration-line-through" key={i.id}>
            {i.title}
          </span>
        ))}
    </>
  );
}
