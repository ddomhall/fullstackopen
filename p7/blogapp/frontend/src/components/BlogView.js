import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import blogService from "../services/blogs";
import loginService from "../services/login";
import storageService from "../services/storage";
import userService from "../services/user.js";
import {
  createInfo,
  createError,
  removeMessage,
} from "../reducers/messageReducer.js";
import {
  setBlogs,
  appendBlog,
  likeBlog,
  removeBlog,
} from "../reducers/blogReducer.js";

export default function BlogView({ blogs, user }) {
  const dispatch = useDispatch();
  const id = useParams().id;
  const navigate = useNavigate();
  const blog = blogs.find((b) => b.id == id);

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

  if (!blog) return null;

  return (
    <>
      <h2>{blog.title}</h2>
      <div>{blog.url}</div>
      <div>{blog.likes} like(s)</div>
      <div>
        created by <Link to={"/users/" + blog.user.id}>{blog.author}</Link>
      </div>
      <button onClick={() => like(blog)}>like</button>
      {user.username === blog.user.username && (
        <button onClick={() => remove(blog)}>remove</button>
      )}
    </>
  );
}
