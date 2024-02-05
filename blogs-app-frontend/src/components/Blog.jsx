import { useState } from "react";

const Blog = ({ blog, updateLikes, user, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const hideWhenShowDetails = { display: "none" };
  const showWhenShowDetails = { display: "" };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleVisibility = () => {
    setShowDetails(!showDetails);
  };

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

  return (
    <div style={blogStyle}>
      <div className="blog">
        {blog.title} {blog.author}{" "}
        <button
          id="btn-view"
          className="detailsButton"
          onClick={handleVisibility}
        >
          {showDetails ? "hide" : "view"}
        </button>
      </div>
      <div
        className="blogDetails"
        style={showDetails ? showWhenShowDetails : hideWhenShowDetails}
      >
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
      </div>
    </div>
  );
};

export default Blog;
