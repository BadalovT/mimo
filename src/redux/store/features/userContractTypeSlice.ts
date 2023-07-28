import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  addUserContractTypeType,
  userContractTypeByUserType,
  userContractTypeUserAccess
} from "../../../types/userContractType";
import { baseUrl } from "../../../utils/url";

type stateType = {
  loading: boolean;
  userContractTypeByUser: userContractTypeByUserType[];
  userContractTypeUserAccess: userContractTypeUserAccess[];
};

const initialState: stateType = {
  loading: false,
  userContractTypeByUser: [] as userContractTypeByUserType[],
  userContractTypeUserAccess: [] as userContractTypeUserAccess[],
};

export const getUserContractTypeUserAccess = createAsyncThunk(
  "UserContractType/GetListUserAccess",
  async () => {
    const response = await axios.get(baseUrl + `UserContractType/GetListUserAccess`);
    return response.data;
  }
);

export const getUserContractTypeById = createAsyncThunk(
  "getUserContractTypeById",
  async () => {
    const response = await axios.get(baseUrl + `UserContractType/GetListNonPagingById`);
    return response.data;
  }
);

export const addUserContractType = createAsyncThunk(
  "addUserContractType",
  async (addUserContractType: addUserContractTypeType) => {
    const response = await axios.post(
      baseUrl + `UserContractType/Add`,
      addUserContractType
    );
    return response.data;
  }
);

export const deleteUserContractType = createAsyncThunk<
  number,
  {
    UserId: number | undefined;
    BusinessContractTypeId: number;
  }
>("deleteUserContractType", async ({ BusinessContractTypeId, UserId }) => {
  const response = await axios.delete(
    baseUrl + `UserContractType/Delete?UserId=${UserId}&BusinessContractTypeId=${BusinessContractTypeId}`
  );
  return response.data;
});

const userContractTypeSlice = createSlice({
  name: "userContractType",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserContractTypeById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserContractTypeById.fulfilled, (state, action) => {
      state.loading = false;
      state.userContractTypeByUser = action.payload;
    });
    builder.addCase(getUserContractTypeById.rejected, (state) => {
      state.loading = false;
    });

    // ADD
    builder.addCase(addUserContractType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addUserContractType.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(addUserContractType.rejected, (state) => {
      state.loading = false;
    });

    // DELETE
    builder.addCase(deleteUserContractType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUserContractType.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteUserContractType.rejected, (state) => {
      state.loading = false;
    });
    // GET LIST USER ACCESS
    builder.addCase(getUserContractTypeUserAccess.pending, (state) => {
      state.loading = true;
    } );
    builder.addCase(getUserContractTypeUserAccess.fulfilled, (state, action) => {
      state.loading = false;
      state.userContractTypeUserAccess = action.payload;
    });
    builder.addCase(getUserContractTypeUserAccess.rejected, (state) => {
            state.loading = false;
    });
    },
});

export default userContractTypeSlice.reducer;
