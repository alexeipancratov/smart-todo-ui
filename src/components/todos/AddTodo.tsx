import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";

export default function AddTodo({ onAddItem }: { onAddItem: Function }) {
  const [title, setTitle] = useState<string>("");

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    onAddItem(title);
    setTitle("");
  };

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Form.Control
          type="text"
          id="title"
          className="input"
          value={title}
          required
          placeholder="New ToDo"
          onChange={onTitleChange}></Form.Control>
      </FormGroup>
      <Button type="submit" variant="primary mb-3 mt-3">
        Add
      </Button>
    </Form>
  );
}
