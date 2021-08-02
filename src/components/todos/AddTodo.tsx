import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";

export default function AddTodo({ onAddItem }: { onAddItem: Function }) {
  const [title, setTitle] = useState<string>("");

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    onAddItem(title);
  };

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Form.Label htmlFor="title">New ToDo</Form.Label>
        <Form.Control
          type="text"
          id="title"
          className="input"
          value={title}
          onChange={onTitleChange}></Form.Control>
      </FormGroup>
      <Button type="submit" variant="primary mb-3 mt-3">
        Create
      </Button>
    </Form>
  );
}
