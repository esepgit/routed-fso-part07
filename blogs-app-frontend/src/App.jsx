import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogService";
import loginService from "./services/loginService";
import Notification from "./components/Notification";
import { useDispatch } from 'react-redux'
import { setNotification } from "./reducers/notificationReducer";
import Users from "./components/Users";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import User from "./components/User";
import userService from "./services/userService";
import BlogDetail from "./components/BlogDetail";
import commentService from "./services/commentService";

import { Form, Button, Navbar, Nav, Container } from "react-bootstrap";

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  let blogSorted = blogs;
  blogSorted.sort((a, b) => b.likes - a.likes);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
    userService.getAll().then((users) => setUsers(users));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotification("wrong username or password"));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService.create(blogObject).then((returnedBlog) => {
      dispatch(setNotification('Blog created'))
      console.log(returnedBlog);
      setBlogs(blogs.concat(returnedBlog));
    });
  };

  const addComment = (id, comment) => {
    commentService.create(`/${id}/comments`, comment).then(returnedComment => {
      dispatch(setNotification('Comment created'))
      const blog = blogs.find(b => b.id === id)
      const updatedBlog = {
        ...blog, comments: [...blog.comments, returnedComment]
      }
      setBlogs(blogs.map(b => b.id === id ? updatedBlog : b))
    })
  }

  const updateLikes = (id, blogObject) => {
    blogService.update(id, blogObject).then((returnedBlog) => {
      console.log(returnedBlog);
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
    });
  };

  const removeBlog = (id) => {
    blogService.deleteBlog(id).then(() => {
      setBlogs(blogs.filter((blog) => blog.id !== id));
    });
  };

  if (user === null) {
    return (
      <div className="container">
        <Notification />
        <h2>Log in to application</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              name="Username"
            />
            <Form.Label>Password</Form.Label>
            <Form.Control
              id="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              name="Password"
            />
          </Form.Group>

          <Button type="submit" className="mt-2">Login</Button>
        </Form>
      </div>
    );
  }

  return (
    <div className="container">
      <BrowserRouter>
        <Navbar bg="dark" data-bs-theme="dark">
            <Nav>
              <Nav.Link as="span">
                <Link to="/blogs">blogs </Link>
              </Nav.Link>
              <Nav.Link as="span">
                <Link to="/users">users </Link>
              </Nav.Link>
              <span className="text-white">
                {user.name} logged in{" "}
                <Button size="sm" id="btn-logout" onClick={handleLogout}>
                  logout
                </Button>
              </span>
            </Nav>
        </Navbar>
        <Notification />
        <h1>Blog App</h1>
        <Routes>
          <Route
            path="/blogs"
            element={
              <>
                <h2>blogs</h2>

                <Togglable buttonLabel="new blog" ref={blogFormRef}>
                  <BlogForm createBlog={addBlog} />
                </Togglable>

                <div className="blogs-container">
                  {blogSorted.map((blog) => (
                    <Blog
                      key={blog.id}
                      blog={blog}
                      updateLikes={updateLikes}
                      user={user}
                      removeBlog={removeBlog}
                    />
                  ))}
                </div>
              </>
            }
          />

          <Route
            path="/blogs/:id"
            element={
              <BlogDetail updateLikes={updateLikes} removeBlog={removeBlog} blogs={blogs} user={user} addComment={addComment} />
            }
          />

          <Route
            path="/users"
            element={<Users blogs={blogs} users={users} />}
          />
          <Route
            path="/users/:id"
            element={<User users={users} blogs={blogs} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
