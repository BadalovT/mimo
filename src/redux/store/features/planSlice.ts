import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
  addPlanFormType,
  getAllPlanPagingRes,
  planFormVal,
  planState,
  updatePlanFormType,
} from "../../../types/plan";
import { baseUrl } from "../../../utils/url";

interface GetAllPlanOptions {
  page: number;
  pageSize: number;
}

export const getAllPlanPagingService = createAsyncThunk<
  getAllPlanPagingRes,
  GetAllPlanOptions
>("plans/getAllPlanPaging", async ({ page, pageSize }) => {
  const response = await axios.get(
    baseUrl + `Plan/GetList?Page=${page}&PageSize=${pageSize}`
    // obj
  );
  return response.data as getAllPlanPagingRes;
});

//planById
export const planById = createAsyncThunk("plan/id", async (id: number) => {
  const response = await axios.get(baseUrl + `Plan/${id}`);
  return response.data;
});

//addPlan
export const addPlan = createAsyncThunk(
  "plans/addPlan",
  async (addPlanForm: addPlanFormType) => {
    const response = await axios.post(baseUrl + "Plan/Add", addPlanForm);
    return response.data;
  }
);

//updatePlan
export const updatePlan = createAsyncThunk(
  "plans/updatePlan",
  async (updatePlanForm: updatePlanFormType) => {
    const response = await axios.put(baseUrl + "Plan/update", updatePlanForm);
    return response.data;
  }
);
//deletePlan
export const deletePlan = createAsyncThunk(
  "plans/deletePlan",
  async (key: number) => {
    const response = await axios.delete(baseUrl + `Plan/delete?Key=${key}`);
    return response.data;
  }
);

const initialState: planState = {
  allPlanPaging: {} as getAllPlanPagingRes,
  loading: false,
  statusCode: 0,
  isOpenModal: false,
  current_page: 1,
  formValue: {} as planFormVal,
};

const planSlice = createSlice({
  name: "planSlice",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isOpenModal = !state.isOpenModal;
      state.formValue = {} as planFormVal;
      state.statusCode = 0;
    },

    resetBranchState: (state) => {
      state.isOpenModal = false;
      state.current_page = 1;
      state.formValue = {} as planFormVal;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPlanPagingService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllPlanPagingService.fulfilled, (state, action) => {
      state.loading = false;
      state.allPlanPaging = action.payload;
    });
    builder.addCase(getAllPlanPagingService.rejected, (state) => {
      state.loading = false;
    });
    //by Id
    builder
      .addCase(planById.pending, (state) => {
        state.loading = true;
      })
      .addCase(planById.fulfilled, (state, action) => {
        state.loading = false;
        state.formValue = action.payload;
        state.isOpenModal = true;
        state.statusCode = 200;
      })
      .addCase(planById.rejected, (state, action) => {
        state.loading = false;
      });

    // Add plan
    builder
      .addCase(addPlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.isOpenModal = false;
        state.statusCode = 200;
      })
      .addCase(addPlan.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message;
        // state.statusCode = action.error.statusCode;
      });
    // Update plan
    builder
      .addCase(updatePlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePlan.fulfilled, (state, action) => {
        state.loading = false;
        state.isOpenModal = false;
        state.statusCode = 200;
      })
      .addCase(updatePlan.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message;
        // state.statusCode = action.error.statusCode;
      });
    // Delete plan
    builder
      .addCase(deletePlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePlan.fulfilled, (state, action) => {
        state.loading = false;
        state.statusCode = 200;
      })
      .addCase(deletePlan.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message;
        // state.statusCode = action.error.statusCode;
      });
  },
});

export default planSlice.reducer;

export const { toggleModal } = planSlice.actions;
