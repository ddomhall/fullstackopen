import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import blogService from "./services/blogs";
import loginService from "./services/login";
import storageService from "./services/storage";
import userService from "./services/user.js";
import {
  createInfo,
  createError,
  removeMessage,
} from "./reducers/messageReducer.js";
import {
  setBlogs,
  appendBlog,
  likeBlog,
  removeBlog,
} from "./reducers/blogReducer.js";
import { setUser } from "./reducers/userReducer.js";
import { setUsers } from "./reducers/usersReducer.js";
import { Routes, Route, Link } from "react-router-dom";
import LoginForm from "./components/Login";
import Notification from "./components/Notification";
import Users from "./components/Users.js";
import Blogs from "./components/Blogs.js";

const App = () => {
  const info = useSelector((store) => store.messages);
  const blogs = useSelector((store) => store.blogs);
  const user = useSelector((store) => store.user);
  const users = useSelector((store) => store.users);

  const dispatch = useDispatch();
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(setUser(storageService.loadUser()));
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));
    userService.getAll().then((users) => dispatch(setUsers(users)));
  }, []);

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      dispatch(setUser(user));
      storageService.saveUser(user);
      dispatch(createInfo("welcome!"));
      setTimeout(() => {
        dispatch(removeMessage());
      }, 3000);
    } catch (e) {
      dispatch(createError("wrong username or password"));
      setTimeout(() => {
        dispatch(removeMessage());
      }, 3000);
    }
  };

  const logout = async () => {
    dispatch(setUser(null));
    storageService.removeUser();
    dispatch(createInfo("logged out"));
    setTimeout(() => {
      dispatch(removeMessage());
    }, 3000);
  };

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

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification info={info} />
        <LoginForm login={login} />
      </div>
    );
  }

  return (
    <div>
      <nav style={{ display: "flex", gap: "10px" }}>
        <Link to={"/"}>home</Link>
        <Link to={"/users"}>users</Link>
      </nav>
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <Notification info={info} />
      <Routes>
        <Route path="/users" element={<Users users={users} />} />
        <Route
          path="/"
          element={
            <Blogs
              blogs={blogs}
              user={user}
              blogFormRef={blogFormRef}
              createBlog={createBlog}
              like={like}
              remove={remove}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
