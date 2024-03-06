import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import storageService from "./services/storage";
import userService from "./services/user.js";
import blogService from "./services/blogs";
import { setBlogs } from "./reducers/blogReducer.js";
import { setUser } from "./reducers/userReducer.js";
import { setUsers } from "./reducers/usersReducer.js";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Users from "./components/Users.js";
import User from "./components/User.js";
import Blogs from "./components/Blogs.js";
import BlogView from "./components/BlogView.js";
import Nav from "./components/Nav.js";

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

  return (
    <div className="w-96 m-auto text-center">
      <Notification info={info} />
      {!user ? (
        <LoginForm />
      ) : (
        <>
          <Nav user={user} />
          <Routes>
            <Route
              path="/blogs/:id"
              element={<BlogView blogs={blogs} user={user} />}
            />
            <Route path="/users/:id" element={<User users={users} />} />
            <Route path="/users" element={<Users users={users} />} />
            <Route path="/" element={<Blogs blogs={blogs} user={user} />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
