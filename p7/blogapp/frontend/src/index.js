import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import messageReducer from "./reducers/messageReducer.js";
import { BrowserRouter as Router } from "react-router-dom";
import blogReducer from "./reducers/blogReducer.js";
import userReducer from "./reducers/userReducer.js";
import usersReducer from "./reducers/usersReducer.js";
import "./index.css";

const store = configureStore({
  reducer: {
    messages: messageReducer,
    blogs: blogReducer,
    user: userReducer,
    users: usersReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
);
