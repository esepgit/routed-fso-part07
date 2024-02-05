import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm";

test("form calls event controller", () => {
  const createBlog = jest.fn();

  const component = render(<BlogForm createBlog={createBlog} />);

  const title = component.container.querySelector("#title");
  const author = component.container.querySelector("#author");
  const url = component.container.querySelector("#url");

  const form = component.container.querySelector("form");

  fireEvent.change(title, {
    target: { value: "A red car" },
  });

  fireEvent.change(author, {
    target: { value: "Benett" },
  });

  fireEvent.change(url, {
    target: { value: "www.benett.com" },
  });

  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].content).toBe("A red car");
  console.debug(createBlog.mock.calls);
});
