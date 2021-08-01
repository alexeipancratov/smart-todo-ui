import { useState, useEffect } from "react";
import { getTodoItems, saveTodoItem } from "../../api/todosApi";
import TodoItem from "../../models/TodoItem";
import ActiveTodoItem from "./ActiveTodoItem";
import AddTodo from "./AddTodo";
import CompletedTodoItem from "./CompletedTodoItem";

export default function TodosPage() {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);

  useEffect(() => {
    getTodoItems().then((todos) => setTodoItems(todos));
  }, []);

  const onMarkAsDone = async (id: string) => {
    const index = todoItems.findIndex((i) => i.id === id);
    const todos = [...todoItems];
    const item = { ...todos[index] };
    item.isCompleted = true;
    todos[index] = item;
    setTodoItems(todos);

    await saveTodoItem(item);
  };

  return (
    <>
      <h3>Manage Todos</h3>
      <AddTodo />
      {todoItems
        .filter((i) => !i.isCompleted)
        .map((i) => (
          <ActiveTodoItem key={i.id} item={i} onMarkAsDone={onMarkAsDone} />
        ))}
      <h4>Completed tasks</h4>
      {todoItems
        .filter((i) => i.isCompleted)
        .map((i) => (
          <CompletedTodoItem key={i.id} item={i} />
        ))}
    </>
  );
}