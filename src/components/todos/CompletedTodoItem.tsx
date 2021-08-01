import { Card } from "react-bootstrap";
import TodoItem from "../../models/TodoItem";

export default function CompletedTodoItem({ item }: { item: TodoItem }) {
  return (
    <Card className="mb-2">
      <Card.Body>
        <span className="text-decoration-line-through" key={item.id}>
          {item.title}
        </span>
      </Card.Body>
    </Card>
  );
}
