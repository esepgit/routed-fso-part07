
import { useParams } from "react-router-dom";

function BlogDetail({ user, blogs, updateLikes, addComment }) {
  console.log(blogs)
  const blogId = useParams().id
  const blog = blogs.find(b => b.id === blogId)
  
  const handleLike = (id) => {
    const likes = blog.likes + 1;
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes,
    };
    updateLikes(id, blogObject);
  };

  const handleRemoveBlog = (id) => {
    if (window.confirm("Do you want to delete the blog?")) {
      removeBlog(id);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(event.target.inputComment.value)
    addComment(blogId, event.target.inputComment.value)
    event.target.inputComment.value = ''
  }

  if (!blog) {
    return null;
  }

  return (
    <section>
      <h2>{blog.title}</h2>
        <a href={blog.url}>{blog.url}</a>
        <div>
          likes {blog.likes}{" "}
          <button id="btn-like" onClick={() => handleLike(blog.id)}>
            like
          </button>
        </div>
        <div>{blog.user.name}</div>
        {user.name === blog.user.name ? (
          <button id="btn-remove" onClick={() => handleRemoveBlog(blog.id)}>
            remove
          </button>
        ) : (
          ""
        )}
        <div>
          <h3>comments</h3>
            <form onSubmit={handleSubmit}>
              <input name="inputComment" placeholder="a comment..." />
              <button>add comment</button>
            </form>
            <ul>
              {blog.comments.map(comment => <li key={comment.id}>{comment.content}</li>)}
            </ul>
        </div>
    </section>
  );
}

export default BlogDetail;
