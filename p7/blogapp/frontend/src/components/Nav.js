import { useDispatch } from "react-redux";
import { createInfo, removeMessage } from "../reducers/messageReducer.js";
import { setUser } from "../reducers/userReducer.js";
import { Link } from "react-router-dom";
import storageService from "../services/storage";

export default function Nav({ user }) {
  const dispatch = useDispatch();

  const logout = async () => {
    dispatch(setUser(null));
    storageService.removeUser();
    dispatch(createInfo("logged out"));
    setTimeout(() => {
      dispatch(removeMessage());
    }, 3000);
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <Link to={"/"}>home</Link>
        <Link to={"/users"}>users</Link>
      </div>
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
    </nav>
  );
}
