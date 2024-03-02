import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    likeBlog(state, action) {
      return state.map((b) =>
        b.id === action.payload.id ? action.payload : b,
      );
    },
    removeBlog(state, action) {
      return state.filter((b) => b.id !== action.payload.id);
    },
  },
});

export const { setBlogs, appendBlog, likeBlog, removeBlog } = blogSlice.actions;
export default blogSlice.reducer;
