import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    uid: null,
    firstName: null,
    lastName: null,
    phoneNumber: null,
    address: null,
    latitude: null,
    longitude: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
