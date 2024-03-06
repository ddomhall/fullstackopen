import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
    updateUsers(state, action) {
      return state;
    },
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
