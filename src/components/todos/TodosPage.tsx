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

    const postedTodoItem = await saveTodoItem(todoItem);
    todoItem.id = postedTodoItem.id;
    todoItem.dateTimeCreated = postedTodoItem.dateTimeCreated;

    setTodoItems([...todoItems, todoItem]);
  };

  const onItemEdit = async (id: string, newTitle: string) => {
    const index = todoItems.findIndex((i) => i.id === id);
    const item = { ...todoItems[index] };
    item.title = newTitle;

    await saveTodoItem(item);

    const todos = [...todoItems];
    todos[index] = item;
    setTodoItems(todos);
  };

  const onMarkAsDone = async (id: string) => {
    const index = todoItems.findIndex((i) => i.id === id);
    const item = { ...todoItems[index] };
    item.isCompleted = true;

    await saveTodoItem(item);

    const todos = [...todoItems];
    todos[index] = item;
    setTodoItems(todos);
  };

  const onItemDelete = async (id: string) => {
    const filteredTodosItems = todoItems.filter((i) => i.id !== id);
    setTodoItems(filteredTodosItems);

    await deleteTodoItem(id);
  };

  return (
    <>
      <h3>Manage ToDos</h3>
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
      <h4>Completed</h4>
      {todoItems
        .filter((i) => i.isCompleted)
        .map((i) => (
          <CompletedTodoItem key={i.id} item={i} onDelete={onItemDelete} />
        ))}
    </>
  );
}
