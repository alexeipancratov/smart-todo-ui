import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from "@testing-library/react";
import TodoItem from "../../models/TodoItem";
import ActiveTodoItem from "./ActiveTodoItem";

function renderActiveTodoItem(args?: any): RenderResult {
  const defaultProps = {
    item: {},
    onMarkAsDone: () => {},
    onDelete: () => {},
    onEdit: () => {},
  };

  const props = { ...defaultProps, ...args };
  return render(<ActiveTodoItem {...props} />);
}

describe("ActiveTodoItem component", () => {
  it("should display the Todo item title", () => {
    const todoItemTitle = "Task 1";
    renderActiveTodoItem({
      item: new TodoItem({
        id: "123",
        title: todoItemTitle,
      }),
    });

    const titleElement = screen.getByText(todoItemTitle);

    expect(titleElement).toBeTruthy();
  });

  describe("Edit Todo item form", () => {
    it("should display edit form on clicking the Edit button", async () => {
      const { container } = renderActiveTodoItem();

      fireEvent.click(screen.getByText("Edit"));
      const form = container.getElementsByTagName("form").item(0);

      expect(form).toBeTruthy();
    });

    it("edit form should dissapear after clicking the Cancel button", async () => {
      const { container } = renderActiveTodoItem();

      fireEvent.click(screen.getByText("Edit"));
      let form = container.getElementsByTagName("form").item(0);
      expect(form).toBeTruthy();

      fireEvent.click(screen.getByText("Cancel"));
      form = container.getElementsByTagName("form").item(0);
      expect(form).toBeFalsy();
    });

    it("edit form should dissapear after clicking the Edit button again", async () => {
      const { container } = renderActiveTodoItem();

      fireEvent.click(screen.getByText("Edit"));
      let form = container.getElementsByTagName("form").item(0);
      expect(form).toBeTruthy();

      fireEvent.click(screen.getByText("Edit"));
      form = container.getElementsByTagName("form").item(0);
      expect(form).toBeFalsy();
    });
  });
});
