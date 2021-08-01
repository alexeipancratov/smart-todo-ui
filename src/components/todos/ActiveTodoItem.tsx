import { Button, Card } from "react-bootstrap";
import TodoItem from "../../models/TodoItem";

export default function ActiveTodoItem({ item }: { item: TodoItem }) {
  return (
    <Card className="mb-2">
      <Card.Body>
        <div className="todo">
          <span>{item.title}</span>
          <div>
            <Button variant="outline-secondary">Edit</Button>
            <Button variant="outline-success">✓</Button>
            <Button variant="outline-danger">✕</Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
