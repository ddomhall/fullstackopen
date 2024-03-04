import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Blog from "./Blog";
import NewBlog from "./NewBlog";
import Togglable from "./Togglable";
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

export default function Blogs({ blogs, user }) {
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  const byLikes = (b1, b2) => b2.likes - b1.likes;

  const createBlog = async (newBlog) => {
    console.log(newBlog);
    const createdBlog = await blogService.create(newBlog);
    console.log(createdBlog);
    dispatch(
      createInfo(`A new blog '${newBlog.title}' by '${newBlog.author}' added`),
    );
    setTimeout(() => {
      dispatch(removeMessage());
    }, 3000);
    dispatch(appendBlog(createdBlog));
    blogFormRef.current.toggleVisibility();
  };

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
      dispatch(
        createInfo(`The blog' ${blog.title}' by '${blog.author} removed`),
      );
      setTimeout(() => {
        dispatch(removeMessage());
      }, 3000);
      dispatch(removeBlog(blog));
    }
  };

  return (
    <>
      <h2>blogs</h2>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      <div>
        {[...blogs].sort(byLikes).map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            like={() => like(blog)}
            canRemove={user && blog.user.username === user.username}
            remove={() => remove(blog)}
          />
        ))}
      </div>
    </>
  );
}
