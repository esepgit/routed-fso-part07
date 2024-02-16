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
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username 
            <input
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              name="Username"
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              name="Password"
            />
          </div>
          <button>login</button>
        </form>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div>
        <Link to="/blogs">blogs </Link>
        <Link to="/users">users </Link>
        <span>
          {user.name} logged in{" "}
          <button id="btn-logout" onClick={handleLogout}>
            logout
          </button>
        </span>
      </div>
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
          element={<BlogDetail blogs={blogs} user={user} addComment={addComment} />}
        />

        <Route path="/users" element={<Users blogs={blogs} users={users} />} />
        <Route
          path="/users/:id"
          element={<User users={users} blogs={blogs} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
