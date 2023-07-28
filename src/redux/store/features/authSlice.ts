import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginForm, LoginRes, RegisterForm } from "../../../types/auth";
import { baseUrl } from "../../../utils/url";
type stateType = {
  data: LoginRes;
  loading: boolean;
  statusCode: string;
  registerMessage: string;
  isLogin: boolean;
};

const initialState: stateType = {
  data: {} as LoginRes,
  loading: false,
  statusCode: "" as string,
  registerMessage: "",
  isLogin: false,
};

export const postRegister = createAsyncThunk(
  "register",
  async (registerData: RegisterForm) => {
    const response = await axios.post(baseUrl + "Auth/Register", registerData);
    return response.data;
  }
);

export const postLogin = createAsyncThunk("login", async (form: LoginForm) => {
  const response = await axios.post(baseUrl + "Auth/Login", form);
  return response.data;
});

export const postForgot = createAsyncThunk("ForgotPassword", async (form: LoginForm) => {
  const response = await axios.post(baseUrl + "Auth/ForgotPassword", form);
  return response.data;
});

export const triggerLogout = createAsyncThunk(
  "logout",
  async (refreshToken: { refreshToken: string }) => {
    const response = await axios.post(
      baseUrl + "Auth/RevokeToken",
      refreshToken
    );
    return response;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // REGISTSER
    builder.addCase(postRegister.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postRegister.fulfilled, (state, action) => {
      state.loading = false;
      // state.registerMessage = action.payload;
      // const navigate = useNavigate();
      // navigate("sign-in");
    });
    builder.addCase(postRegister.rejected, (state) => {
      state.loading = false;
    });

    // LOGIN
    builder.addCase(postLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.isLogin = true;
      localStorage.setItem(
        "mimoToken",
        JSON.stringify(action.payload.accessToken)
      );

      localStorage.setItem(
        "mimoRefreshToken",
        JSON.stringify(action.payload.refreshToken)
      );

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${action.payload.accessToken}`;
    });
    builder.addCase(postLogin.rejected, (state) => {
      state.loading = false;
    });

    // LOGOUT

    builder.addCase(triggerLogout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(triggerLogout.fulfilled, (state) => {
      state.loading = false;

      localStorage.removeItem("mimoToken");

      localStorage.removeItem("mimoRefreshToken");

      window.location.replace("sign-in");
    });
    builder.addCase(triggerLogout.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(postForgot.pending, (state) => {
      state.loading = true;
    } );
    builder.addCase(postForgot.fulfilled, (state, action) => {
      state.loading = false;
    } );
    builder.addCase(postForgot.rejected, (state) => {
      state.loading = false;
    } );
  },
});

export default authSlice.reducer;
