import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  addRoleOperationClaimsType,
  roleOperationClaimsByRoleType,
} from "../../../types/roleOperationClaim";
import { baseUrl } from "../../../utils/url";

type stateType = {
  loading: boolean;
  roleOperationClaimsByRole: roleOperationClaimsByRoleType[];
};

const initialState: stateType = {
  loading: false,
  roleOperationClaimsByRole: [] as roleOperationClaimsByRoleType[],
};

export const getRoleOperationClaimById = createAsyncThunk(
  "getOperationClaims",
  async (key: number | undefined) => {
    const response = await axios.post(baseUrl + `RoleOperationClaim/${key}`);
    return response.data;
  }
);

export const addRoleOperationClaims = createAsyncThunk(
  "addRoleOperationClaims",
  async (addRoleOperationClaims: addRoleOperationClaimsType) => {
    const response = await axios.post(
      baseUrl + `RoleOperationClaim/Add`,
      addRoleOperationClaims
    );
    return response.data;
  }
);

export const deleteRoleOperationClaims = createAsyncThunk<
  number,
  {
    OperationClaimId: number;
    RoleId: number | undefined;
  }
>("deleteRoleOperationClaims", async ({ OperationClaimId, RoleId }) => {
  const response = await axios.delete(
    baseUrl +
      `RoleOperationClaim/Delete?OperationClaimId=${OperationClaimId}&RoleId=${RoleId}`
  );
  return response.data;
});

const roleOperationClaimSlice = createSlice({
  name: "roleOperationClaim",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoleOperationClaimById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRoleOperationClaimById.fulfilled, (state, action) => {
      state.loading = false;
      state.roleOperationClaimsByRole = action.payload;
    });
    builder.addCase(getRoleOperationClaimById.rejected, (state) => {
      state.loading = false;
    });

    // ADD
    builder.addCase(addRoleOperationClaims.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addRoleOperationClaims.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(addRoleOperationClaims.rejected, (state) => {
      state.loading = false;
    });

    // DELETE
    builder.addCase(deleteRoleOperationClaims.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteRoleOperationClaims.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteRoleOperationClaims.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default roleOperationClaimSlice.reducer;
