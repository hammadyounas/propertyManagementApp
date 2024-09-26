import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
// import { toast } from "react-toastify";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuth: false,
  },
  reducers: {
    handleLogin: (state, action) => {
      (state.isAuth = action.payload.isAuth),
        (state.user = action.payload.user);
      // state.isAuth = action.payload;
      // // save isAuth in local storage
      // if (typeof window !== "undefined") {
      //   window?.localStorage.setItem("isAuth", JSON.stringify(state.isAuth));
      // }
      // toast.success("User logged in successfully", {
      //   position: "top-right",
      //   autoClose: 1500,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
    },
    handleLogout: (state, action) => {
      state.isAuth = false;
      state.user = null;
      if (typeof window !== "undefined") {
        window?.localStorage.removeItem("username");
        window?.localStorage.clear();
      }
    },
  },
});

export const { handleRegister, handleLogin, handleLogout } = authSlice.actions;
export default authSlice.reducer;
