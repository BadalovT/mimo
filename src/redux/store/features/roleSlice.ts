import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
  FormVal,
  getAllRolePagingRes,
  roleState,
  addRoleFormType,
  updateRoleFormType,
} from "../../../types/role";
import { baseUrl } from "../../../utils/url";

interface GetAllRoleOptions {
  page: number;
  pageSize: number;
  // obj: Record<string, any>;
}
export const getAllRolePagingService = createAsyncThunk<
  getAllRolePagingRes,
  GetAllRoleOptions
>("roles/getAllRolePaging", async ({ page, pageSize }) => {
  const response = await axios.get(
    baseUrl + `Role/GetList?Page=${page}&PageSize=${pageSize}`
    // obj
  );
  // console.log(response.data);
  return response.data as getAllRolePagingRes;
});

//roleById
export const roleById = createAsyncThunk("role/id", async (id: number) => {
  const response = await axios.get(baseUrl + `Role/${id}`);
  return response.data;
});

//addRole
export const addRole = createAsyncThunk(
  "roles/addRole",
  async (addRoleForm: addRoleFormType) => {
    const response = await axios.post(baseUrl + "Role/Add", addRoleForm);
    return response.data;
  }
);

//updateRole
export const updateRole = createAsyncThunk(
  "roles/updateRole",
  async (updateRoleForm: updateRoleFormType) => {
    const response = await axios.put(baseUrl + "Role/update", updateRoleForm);
    return response.data;
  }
);
//deleteRole
export const deleteRole = createAsyncThunk(
  "roles/deleteRole",
  async (key: number) => {
    const response = await axios.delete(baseUrl + `Role/delete?Key=${key}`);
    return response.data;
  }
);

const initialState: roleState = {
  allRolePaging: {} as getAllRolePagingRes,
  loading: false,
  statusCode: 0,
  isOpenModal: false,
  current_page: 1,
  formValue: {} as FormVal,
};

const roleSlice = createSlice({
  name: "roleSlice",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isOpenModal = !state.isOpenModal;
      state.formValue = {} as FormVal;
      state.statusCode = 0;
    },

    resetBranchState: (state) => {
      state.isOpenModal = false;
      state.current_page = 1;
      state.formValue = {} as FormVal;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllRolePagingService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllRolePagingService.fulfilled, (state, action) => {
      state.loading = false;
      state.statusCode = 0;
      //   console.log(action.payload);
      // @ts-ignore
      state.allRolePaging = action.payload;
    });
    builder.addCase(getAllRolePagingService.rejected, (state) => {
      state.loading = false;
    });
    //RoleById
    builder
      .addCase(roleById.pending, (state) => {
        state.loading = true;
      })
      .addCase(roleById.fulfilled, (state, action) => {
        state.loading = false;
        state.formValue = action.payload;
        state.isOpenModal = true;

        state.statusCode = 200;
      })
      .addCase(roleById.rejected, (state, action) => {
        state.loading = false;
      });
    // Add role
    builder
      .addCase(addRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(addRole.fulfilled, (state, action) => {
        state.loading = false;
        state.isOpenModal = false;
        // state.allRolePaging.items.push(action.payload);
        state.statusCode = 200;
      })
      .addCase(addRole.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message;
        // state.statusCode = action.error.statusCode;
      });
    // Update role
    builder
      .addCase(updateRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.loading = false;
        state.isOpenModal = false;
        state.statusCode = 200;
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message;
        // state.statusCode = action.error.statusCode;
      });
    // Delete role
    builder
      .addCase(deleteRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.loading = false;
        state.statusCode = 200;
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message;
        // state.statusCode = action.error.statusCode;
      });
  },
});

export default roleSlice.reducer;

export const { toggleModal } = roleSlice.actions;
