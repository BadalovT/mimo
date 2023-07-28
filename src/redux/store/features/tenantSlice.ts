import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  getAllTenantPagingRes,
  tenantFormVal,
  tenantState,
  updateTenantFormType,
} from "../../../types/tenant";
import { baseUrl } from "../../../utils/url";

const initialState: tenantState = {
  allTenant: {} as getAllTenantPagingRes,
  loading: false,
  statusCode: 0,
  isOpenModal: false,
  current_page: 1,
  formValue: {} as tenantFormVal,
};

type PagePageSizeType = {
  page: number;
  pageSize: number;
  obj: {};
};

export const getAllTenant = createAsyncThunk<
  getAllTenantPagingRes,
  PagePageSizeType
>("allTenant", async ({ page, pageSize, obj }) => {
  const response = await axios.post(
    baseUrl + `Tenant/GetList/ByDynamic?Page=${page}&PageSize=${pageSize}`,
    obj
  );
  return response.data;
});

export const tentantById = createAsyncThunk(
  "tenantById",
  async (key: number) => {
    const response = await axios.get(baseUrl + `Tenant/${key}`);
    return response.data;
  }
);

export const deleteTenant = createAsyncThunk(
  "deleteTenant",
  async (key: number) => {
    const response = await axios.delete(baseUrl + `Tenant/Delete?Key=${key}`);
    return response.data;
  }
);

export const updateTenant = createAsyncThunk(
  "updateTenant",
  async (updateTenant: updateTenantFormType) => {
    const response = await axios.put(baseUrl + `Tenant/Update`, updateTenant);
    return response.data;
  }
);

const tenantSlice = createSlice({
  name: "tenant",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isOpenModal = !state.isOpenModal;
      state.formValue = {} as tenantFormVal;
      state.statusCode = 0;
    },
  },
  extraReducers: (builder) => {
    // ALL TENANT
    builder.addCase(getAllTenant.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllTenant.fulfilled, (state, action) => {
      state.loading = false;
      state.allTenant = action.payload;
    });
    builder.addCase(getAllTenant.rejected, (state) => {
      state.loading = false;
    });

    // TENANT BY ID

    builder.addCase(tentantById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(tentantById.fulfilled, (state, action) => {
      state.loading = false;
      state.isOpenModal = true;
      state.formValue = action.payload;
    });
    builder.addCase(tentantById.rejected, (state) => {
      state.loading = false;
    });

    // UPDATE TENANT

    builder.addCase(updateTenant.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTenant.fulfilled, (state, action) => {
      state.loading = false;
      state.isOpenModal = false;
    });
    builder.addCase(updateTenant.rejected, (state) => {
      state.loading = false;
    });

    // DELETE TENANT

    builder.addCase(deleteTenant.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTenant.fulfilled, (state, action) => {
      state.loading = false;
      state.isOpenModal = false;
    });
    builder.addCase(deleteTenant.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default tenantSlice.reducer;

export const { toggleModal } = tenantSlice.actions;
