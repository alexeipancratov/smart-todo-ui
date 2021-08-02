import { Button, Card } from "react-bootstrap";
import TodoItem from "../../models/TodoItem";

export default function CompletedTodoItem({
  item,
  onDelete,
}: {
  item: TodoItem;
  onDelete: Function;
}) {
  const onDeleteClick = () => {
    onDelete(item.id);
  };

  return (
    <Card className="border-success mb-2">
      <Card.Body>
        <div className="todo">
          <span className="text-decoration-line-through" key={item.id}>
            {item.title}
          </span>
          <div>
            <Button
              variant="outline-danger"
              onClick={onDeleteClick}
              title="Delete">
              ✕
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
