import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/url";

type operationClaimItem = {
  name: string;
  code: string;
  action: null;
  isMenu: boolean;
  key: number;
};

type stateType = {
  loading: boolean;
  allOperationClaims: operationClaimItem[];
};

const initialState: stateType = {
  loading: false,
  allOperationClaims: [] as operationClaimItem[],
};

export const getAllOperationClaims = createAsyncThunk(
  "getOperationClaims",
  async () => {
    const response = await axios.get(
      baseUrl + "OperationClaims/GetListNonPaging"
    );
    return response.data;
  }
);

const operationClaimSlice = createSlice({
  name: "operationClaim",
  initialState,
  reducers: {},
  extraReducers: async (builder) => {
    builder.addCase(getAllOperationClaims.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllOperationClaims.fulfilled, (state, action) => {
      state.loading = false;
      state.allOperationClaims = action.payload;
    });
    builder.addCase(getAllOperationClaims.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default operationClaimSlice.reducer;
