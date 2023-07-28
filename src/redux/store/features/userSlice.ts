import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  getAllUserPagingRes,
  getAllUserItem,
  userState,
  userForm,
  addUserFormType,
  updateUserFormType,
} from "../../../types/user";
import { baseUrl } from "../../../utils/url";

const initialState: userState = {
  allUserPaging: {} as getAllUserPagingRes,
  allUser: [] as getAllUserItem[],
  loading: false,
  isOpenModal: false,
  current_page: 1,
  formValue: {} as userForm,
  mode: "",
};

export const getAllUserPaging = createAsyncThunk<
  getAllUserPagingRes,
  { page: number; pageSize: number; obj: {} }
>("getAllUserPaging", async ({ page, pageSize, obj }) => {
  const response = await axios.post(
    baseUrl + `Users/GetList/ByTenantDynamic?Page=${page}&PageSize=${pageSize}`,
    obj
  );
  return response.data as getAllUserPagingRes;
});

export const getAllUser = createAsyncThunk("getAlUser", async () => {
  const response = await axios.post(baseUrl + `Users/GetListNonPaging`);
  return response.data;
});

export const getUserById = createAsyncThunk("usrById", async (key: number) => {
  const response = await axios.get(baseUrl + `Users/${key}`);
  return response.data;
});

export const addUser = createAsyncThunk(
  "addUser",
  async (createUserForm: addUserFormType) => {
    const response = await axios.post(baseUrl + "Users/Add", createUserForm);
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  "updateUser",
  async (updateUserForm: updateUserFormType) => {
    const response = await axios.post(baseUrl + "Users/Update", updateUserForm);
    return response.data;
  }
);

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (key: number) => {
    const response = await axios.delete(baseUrl + `Users/Delete?Key=${key}`);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isOpenModal = !state.isOpenModal;
      state.formValue = {} as userForm;
    },
    showDrawer: (state, action) => {
      state.isOpenModal = !state.isOpenModal;
      state.mode = action.payload;
    },
  },
  extraReducers: (builder) => {
    // ALL USER PAGING
    builder.addCase(getAllUserPaging.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllUserPaging.fulfilled, (state, action) => {
      state.loading = false;
      state.allUserPaging = action.payload;
    });
    builder.addCase(getAllUserPaging.rejected, (state) => {
      state.loading = true;
    });

    // ALL USER
    builder.addCase(getAllUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllUser.fulfilled, (state, action) => {
      state.loading = false;
      state.allUser = action.payload;
    });
    builder.addCase(getAllUser.rejected, (state) => {
      state.loading = true;
    });

    // USER BY ID

    builder.addCase(getUserById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.loading = false;
      state.isOpenModal = true;
      state.formValue = action.payload;
    });
    builder.addCase(getUserById.rejected, (state) => {
      state.loading = false;
    });

    // ADD USER

    builder.addCase(addUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isOpenModal = false;
    });
    builder.addCase(addUser.rejected, (state) => {
      state.loading = false;
    });

    // UPDATE USER
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isOpenModal = false;
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.loading = false;
    });

    // DELETE USER

    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isOpenModal = false;
    });
    builder.addCase(deleteUser.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default userSlice.reducer;

export const { toggleModal, showDrawer } = userSlice.actions;
