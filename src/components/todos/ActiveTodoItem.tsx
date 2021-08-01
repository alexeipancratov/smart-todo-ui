import { Button, Card } from "react-bootstrap";
import TodoItem from "../../models/TodoItem";

export default function ActiveTodoItem({
  item,
  onMarkAsDone,
  onDelete,
}: {
  item: TodoItem;
  onMarkAsDone: Function;
  onDelete: Function;
}) {
  const onDoneClick = () => {
    onMarkAsDone(item.id);
  };

  const onDeleteClick = () => {
    onDelete(item.id);
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <div className="todo">
          <span>{item.title}</span>
          <div>
            <Button variant="outline-secondary">Edit</Button>
            <Button variant="outline-success" onClick={onDoneClick}>
              ✓
            </Button>
            <Button variant="outline-danger" onClick={onDeleteClick}>
              ✕
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
