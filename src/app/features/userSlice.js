import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : null,
  selectedCardArr: [],
  loading: false,
  // pinArr: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInFailuer: (state) => {
      state.loading = false;
      state.currentUser = null;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    selectedCardArr: (state, action) => {
      state.selectedCardArr.push(action.payload);
    },

    removeSelecteCard: (state, action) => {
      state.selectedCardArr = state.selectedCardArr.filter(
        (item) => item != action.payload
      );
    },

    deleteUser: (state, action) => {
      state.currentUser = localStorage.clear(action.payload);
    },
    // pinCard: (state, action) => {
    //   state.pinArr.push(action.payload);
    //   // console.log(action.payload);
    // },
  },
});

export const {
  signInStart,
  signInFailuer,
  signInSuccess,
  selectedCardArr,
  removeSelecteCard,
  pinCard,
  deleteUser,
} = userSlice.actions;

export default userSlice.reducer;
