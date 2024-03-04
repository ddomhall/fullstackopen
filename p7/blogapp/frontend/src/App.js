import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import storageService from "./services/storage";
import userService from "./services/user.js";
import blogService from "./services/blogs";
import { createInfo, removeMessage } from "./reducers/messageReducer.js";
import { setBlogs } from "./reducers/blogReducer.js";
import { setUser } from "./reducers/userReducer.js";
import { setUsers } from "./reducers/usersReducer.js";
import { Routes, Route, Link } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Users from "./components/Users.js";
import User from "./components/User.js";
import Blogs from "./components/Blogs.js";

const App = () => {
  const info = useSelector((store) => store.messages);
  const blogs = useSelector((store) => store.blogs);
  const user = useSelector((store) => store.user);
  const users = useSelector((store) => store.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser(storageService.loadUser()));
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));
    userService.getAll().then((users) => dispatch(setUsers(users)));
  }, []);

  const logout = async () => {
    dispatch(setUser(null));
    storageService.removeUser();
    dispatch(createInfo("logged out"));
    setTimeout(() => {
      dispatch(removeMessage());
    }, 3000);
  };

  return (
    <>
      <Notification info={info} />
      {!user ? (
        <LoginForm />
      ) : (
        <>
          <nav style={{ display: "flex", gap: "10px" }}>
            <Link to={"/"}>home</Link>
            <Link to={"/users"}>users</Link>
          </nav>
          <div>
            {user.name} logged in
            <button onClick={logout}>logout</button>
          </div>
          <Routes>
            <Route path="/users/:id" element={<User users={users} />} />
            <Route path="/users" element={<Users users={users} />} />
            <Route path="/" element={<Blogs blogs={blogs} user={user} />} />
          </Routes>
        </>
      )}
    </>
  );
};

export default App;
