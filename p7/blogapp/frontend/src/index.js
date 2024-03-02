import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import messageReducer from "./reducers/messageReducer.js";
import blogReducer from "./reducers/blogReducer.js";

const store = configureStore({
  reducer: {
    messages: messageReducer,
    blogs: blogReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
