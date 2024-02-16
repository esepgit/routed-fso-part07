import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleAddBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
    });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div className="formDiv">
      <h2>create new blog</h2>
      <Form onSubmit={handleAddBlog}>
        <div>
          <Form.Label>Title</Form.Label>
          <Form.Control
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <Form.Label>Author</Form.Label>
          <Form.Control
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <Form.Label>URL</Form.Label>
          <Form.Control
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button size="sm" id="btn-create" type="submit">
          create
        </Button>
      </Form>
    </div>
  );
};

export default BlogForm;
