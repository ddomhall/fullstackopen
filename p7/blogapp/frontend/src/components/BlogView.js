import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import blogService from "../services/blogs";
import { createInfo, removeMessage } from "../reducers/messageReducer.js";
import { setBlogs, likeBlog, removeBlog } from "../reducers/blogReducer.js";

export default function BlogView({ blogs, user }) {
  const dispatch = useDispatch();
  const id = useParams().id;
  const navigate = useNavigate();
  const blog = blogs.find((b) => b.id === id);

  const like = async (blog) => {
    const blogToUpdate = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    const updatedBlog = await blogService.update(blogToUpdate);
    dispatch(
      createInfo(`A like for the blog '${blog.title}' by '${blog.author}'`),
    );
    setTimeout(() => {
      dispatch(removeMessage());
    }, 3000);
    dispatch(likeBlog(updatedBlog));
  };

  const remove = async (blog) => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`,
    );
    if (ok) {
      await blogService.remove(blog.id);
      navigate("/");
      dispatch(
        createInfo(`The blog' ${blog.title}' by '${blog.author} removed`),
      );
      setTimeout(() => {
        dispatch(removeMessage());
      }, 3000);
      dispatch(removeBlog(blog));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const comment = { content: e.target.elements.content.value };
    const updatedBlog = await blogService.addComment(id, comment);

    dispatch(setBlogs(blogs.map((b) => (b.id === id ? updatedBlog : b))));
    dispatch(createInfo(`Comment ${comment.content} added`));
    setTimeout(() => {
      dispatch(removeMessage());
    }, 3000);

    e.target.reset();
  };

  if (!blog) return null;

  return (
    <>
      <h2>{blog.title}</h2>
      <a href={blog.url} className="underline">
        {blog.url}
      </a>
      <div>{blog.likes} like(s)</div>
      <div>
        created by <Link to={"/users/" + blog.user.id}>{blog.author}</Link>
      </div>
      <form onSubmit={handleSubmit}>
        <input name="content" placeholder="comment" />
        <input type="submit" />
      </form>
      {blog.comments.length > 0 && (
        <>
          <h3>comments</h3>
          <ul>
            {blog.comments.map((c) => (
              <li key={c._id}>{c.content}</li>
            ))}
          </ul>
        </>
      )}
      <button onClick={() => like(blog)} className="mr-1">
        like
      </button>
      {user.username === blog.user.username && (
        <button onClick={() => remove(blog)} className="ml-1">
          remove
        </button>
      )}
    </>
  );
}
