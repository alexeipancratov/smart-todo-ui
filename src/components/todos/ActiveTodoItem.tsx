import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Button, Card, Form, FormGroup } from "react-bootstrap";
import TodoItem from "../../models/TodoItem";

export default function ActiveTodoItem({
  item,
  onMarkAsDone,
  onDelete,
  onEdit,
}: {
  item: TodoItem;
  onMarkAsDone: Function;
  onDelete: Function;
  onEdit: Function;
}) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(item.title);

  const onToggleEditModeClick = () => {
    setIsEditMode(!isEditMode);
  };

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const onEditSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    onEdit(item.id, newTitle);
    setIsEditMode(!isEditMode);
  };

  const onDoneClick = () => {
    onMarkAsDone(item.id);
  };

  const onDeleteClick = () => {
    onDelete(item.id);
  };

  return (
    <Card className="border-info mb-2">
      <Card.Body>
        <div className="todo">
          <span>{item.title}</span>
          <div>
            <Button variant="outline-secondary" onClick={onToggleEditModeClick}>
              Edit
            </Button>
            <Button
              variant="outline-success"
              onClick={onDoneClick}
              title="Mark as Completed">
              ✓
            </Button>
            <Button
              variant="outline-danger"
              onClick={onDeleteClick}
              title="Delete">
              ✕
            </Button>
          </div>
        </div>
        {isEditMode && (
          <div className="edit-todo">
            <Form onSubmit={onEditSubmit}>
              <FormGroup>
                <Form.Label htmlFor="title">New Title</Form.Label>
                <Form.Control
                  type="text"
                  id="title"
                  className="input"
                  value={newTitle}
                  required
                  onChange={onTitleChange}></Form.Control>
              </FormGroup>
              <Button type="submit" variant="primary mt-3">
                Save
              </Button>
              <Button
                onClick={onToggleEditModeClick}
                variant="secondary mt-3 mx-3">
                Cancel
              </Button>
            </Form>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
