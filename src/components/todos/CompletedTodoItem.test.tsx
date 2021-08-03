import { render, RenderResult, screen } from "@testing-library/react";
import TodoItem from "../../models/TodoItem";
import CompletedTodoItem from "./CompletedTodoItem";

function renderCompletedTodoItem(args?: any): RenderResult {
  const defaultProps = {
    item: new TodoItem({
      id: "123",
      title: "Task 1",
    }),
    onDelete: () => {},
  };

  const props = { ...defaultProps, ...args };
  return render(<CompletedTodoItem {...props} />);
}

describe("CompletedTodoItem component", () => {
  it("should display the Todo item title", () => {
    const todoItemTitle = "Task 1";
    renderCompletedTodoItem({
      item: new TodoItem({
        id: "123",
        title: todoItemTitle,
      }),
    });

    expect(screen.getByText(todoItemTitle)).toBeVisible();
  });

  it("should display Delete button", () => {
    renderCompletedTodoItem();

    expect(screen.getByTitle("Delete")).toBeVisible();
  });
});
