import { useRef } from "react";
import { useDispatch } from "react-redux";
import Blog from "./Blog";
import NewBlog from "./NewBlog";
import Togglable from "./Togglable";
import blogService from "../services/blogs";
import { createInfo, removeMessage } from "../reducers/messageReducer.js";
import { appendBlog } from "../reducers/blogReducer.js";

export default function Blogs({ blogs, user }) {
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  const byLikes = (b1, b2) => b2.likes - b1.likes;

  const createBlog = async (newBlog) => {
    const createdBlog = await blogService.create(newBlog);
    dispatch(
      createInfo(`A new blog '${newBlog.title}' by '${newBlog.author}' added`),
    );
    setTimeout(() => {
      dispatch(removeMessage());
    }, 3000);
    dispatch(appendBlog(createdBlog));
    blogFormRef.current.toggleVisibility();
  };

  return (
    <>
      <h2>blogs</h2>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      <div>
        {[...blogs].sort(byLikes).map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  );
}
