import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteTodoItem, getTodoItems, saveTodoItem } from "../../api/todosApi";
import TodoItem from "../../models/TodoItem";
import ActiveTodoItem from "./ActiveTodoItem";
import AddTodo from "./AddTodo";
import CompletedTodoItem from "./CompletedTodoItem";

export default function TodosPage() {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [errorModalMessage, setErrorModalMessage] = useState<string>("");
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  useEffect(() => {
    getTodoItems()
      .then((todos) => setTodoItems(todos))
      .catch(handleErrorResponse);
  }, []);

  const handleErrorModalClose = () => setShowErrorModal(false);

  const handleErrorResponse = (e: Error) => {
    setErrorModalMessage(e.message);
    setShowErrorModal(true);
  };

  const onAddItem = async (title: string) => {
    const todoItem = new TodoItem({
      title: title,
    });

    try {
      const postedTodoItem = await saveTodoItem(todoItem);
      todoItem.id = postedTodoItem.id;
      todoItem.dateTimeCreated = postedTodoItem.dateTimeCreated;

      setTodoItems([...todoItems, todoItem]);
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const onItemEdit = async (id: string, newTitle: string) => {
    const index = todoItems.findIndex((i) => i.id === id);
    const item = { ...todoItems[index] };
    item.title = newTitle;

    try {
      await saveTodoItem(item);

      const todos = [...todoItems];
      todos[index] = item;
      setTodoItems(todos);
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const onMarkAsDone = async (id: string) => {
    const index = todoItems.findIndex((i) => i.id === id);
    const item = { ...todoItems[index] };
    item.isCompleted = true;

    try {
      await saveTodoItem(item);

      const todos = [...todoItems];
      todos[index] = item;
      setTodoItems(todos);
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const onItemDelete = async (id: string) => {
    const filteredTodosItems = todoItems.filter((i) => i.id !== id);
    setTodoItems(filteredTodosItems);

    try {
      await deleteTodoItem(id);
    } catch (error) {
      handleErrorResponse(error);
    }
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
      <Modal show={showErrorModal} onHide={handleErrorModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorModalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleErrorModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
