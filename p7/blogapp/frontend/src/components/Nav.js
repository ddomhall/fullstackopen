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
    <nav className="flex justify-between h-10 leading-10 border-b">
      <div>
        <Link to={"/"} className="border-r px-2">
          home
        </Link>
        <Link to={"/users"} className="border-r px-2">
          users
        </Link>
      </div>
      <div>
        <span className="border-r px-2">{user.name} logged in</span>
        <button onClick={logout} className="px-2">
          logout
        </button>
      </div>
    </nav>
  );
}
