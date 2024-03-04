import { useState } from "react";
import { useDispatch } from "react-redux";
import loginService from "../services/login";
import storageService from "../services/storage";
import {
  createInfo,
  createError,
  removeMessage,
} from "../reducers/messageReducer.js";
import { setUser } from "../reducers/userReducer.js";
import { setUsers } from "../reducers/usersReducer.js";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
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

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            id="username"
            autoFocus
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
