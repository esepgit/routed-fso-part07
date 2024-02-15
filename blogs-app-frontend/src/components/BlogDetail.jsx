import { useParams } from "react-router-dom";

function BlogDetail({ user, blogs, updateLikes }) {
  const blogId = useParams().id
  const blog = blogs.find(b => b.id = blogId)
  
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

  if (!blog) {
    return null;
  }

  return (
    <section>
        <div>{blog.url}</div>
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
    </section>
  );
}

export default BlogDetail;
