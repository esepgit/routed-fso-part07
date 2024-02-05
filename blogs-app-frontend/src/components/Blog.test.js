import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import Blog from "./Blog";

const blog = {
  title: "New blog",
  author: "Klee",
  url: "http://klee.com",
  likes: 50,
  user: {
    username: "crimson",
    name: "Klee",
  },
};

const user = { name: "Klee" };

const component = render(<Blog blog={blog} user={user} />);
component.debug();

test("render blog contains title and author, but no url or likes", () => {
  const div = component.container.querySelector(".blog");

  expect(div).toHaveTextContent("New blog");
  expect(div).toHaveTextContent("Klee");
  expect(div).not.toHaveTextContent("http://klee.com");
  expect(div).not.toHaveTextContent("50");
});

test("url and likes are displayed when click show button", () => {
  const button = screen.getByRole("button");
  fireEvent.click(button);

  const div = component.container.querySelector(".blogDetails");

  expect(div).toHaveTextContent("http://klee.com");
  expect(div).toHaveTextContent("50");
});
