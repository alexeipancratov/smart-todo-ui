import { useState, useEffect } from "react";
import { deleteTodoItem, getTodoItems, saveTodoItem } from "../../api/todosApi";
import TodoItem from "../../models/TodoItem";
import ActiveTodoItem from "./ActiveTodoItem";
import AddTodo from "./AddTodo";
import CompletedTodoItem from "./CompletedTodoItem";

export default function TodosPage() {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);

  useEffect(() => {
    getTodoItems().then((todos) => setTodoItems(todos));
  }, []);

  const onAddItem = async (title: string) => {
    const todoItem = new TodoItem({
      title: title,
    });
    setTodoItems([...todoItems, todoItem]);

    await saveTodoItem(todoItem);
  };

  const onItemEdit = async (id: string, newTitle: string) => {
    const index = todoItems.findIndex((i) => i.id === id);
    const todos = [...todoItems];
    const item = { ...todos[index] };
    item.title = newTitle;
    todos[index] = item;
    setTodoItems(todos);

    await saveTodoItem(item);
  };

  const onMarkAsDone = async (id: string) => {
    const index = todoItems.findIndex((i) => i.id === id);
    const todos = [...todoItems];
    const item = { ...todos[index] };
    item.isCompleted = true;
    todos[index] = item;
    setTodoItems(todos);

    await saveTodoItem(item);
  };

  const onItemDelete = async (id: string) => {
    const filteredTodosItems = todoItems.filter((i) => i.id !== id);
    setTodoItems(filteredTodosItems);

    await deleteTodoItem(id);
  };

  return (
    <>
      <h3>Manage Todos</h3>
      <AddTodo onAddItem={onAddItem} />
      {todoItems
        .filter((i) => !i.isCompleted)
        .map((i) => (
          <ActiveTodoItem
            key={i.id}
            item={i}
            onEdit={onItemEdit}
            onMarkAsDone={onMarkAsDone}
            onDelete={onItemDelete}
          />
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
