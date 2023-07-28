import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  addUserRoleType,
  userRoleByUserType,
} from "../../../types/userRole";
import { baseUrl } from "../../../utils/url";

type stateType = {
  loading: boolean;
  userRoleByUser: userRoleByUserType[];
};

const initialState: stateType = {
  loading: false,
  userRoleByUser: [] as userRoleByUserType[],
};

export const getUserRoleById = createAsyncThunk(
  "getUserRoleById",
  async (key: number | undefined) => {
    const response = await axios.post(baseUrl + `UserRole/${key}`);
    return response.data;
  }
);

export const addUserRole = createAsyncThunk(
  "addUserRole",
  async (addUserRole: addUserRoleType) => {
    const response = await axios.post(
      baseUrl + `UserRole/Add`,
      addUserRole
    );
    return response.data;
  }
);

export const deleteUserRole = createAsyncThunk<
  number,
  {
    UserId: number | undefined;
    RoleId: number;
  }
>("deleteUserRole", async ({ RoleId, UserId }) => {
  const response = await axios.delete(
    baseUrl +
      `UserRole/Delete?UserId=${UserId}&RoleId=${RoleId}`
  );
  return response.data;
});

const userRoleSlice = createSlice({
  name: "userRole",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserRoleById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserRoleById.fulfilled, (state, action) => {
      state.loading = false;
      state.userRoleByUser = action.payload;
    });
    builder.addCase(getUserRoleById.rejected, (state) => {
      state.loading = false;
    });

    // ADD
    builder.addCase(addUserRole.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addUserRole.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(addUserRole.rejected, (state) => {
      state.loading = false;
    });

    // DELETE
    builder.addCase(deleteUserRole.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUserRole.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteUserRole.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default userRoleSlice.reducer;
