import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

describe("Header component", () => {
  it("contains 2 anchor elements", () => {
    const { container } = render(<Header />, { wrapper: MemoryRouter });

    expect(container.getElementsByTagName("a").length).toBe(2);
  });
});
