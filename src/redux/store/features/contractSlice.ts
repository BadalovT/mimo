import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/url";
import {createAsyncThunk} from "@reduxjs/toolkit";

import {
  FormVal, getAllContractPagingRes, contractState,
  filterState, allContractItem,
} from "../../../types/contract";

export const getAllContractPagingService = createAsyncThunk<
    getAllContractPagingRes,
    { page: number; pageSize: number; filterState: filterState }
>("properties/getAllContractPaging", async ({ page, pageSize, filterState }) => {
  const response = await axios.post(
      baseUrl + `Contract/GetList/ByTenantDynamic?Page=${page}&PageSize=${pageSize}`,filterState
  );
  return response.data as getAllContractPagingRes;
});


// all contract without paging
export const fetchAllContract = createAsyncThunk("allContract", async () => {
  const response = await axios.post(baseUrl + "Contract/GetList/BytenantNonPaging");
  return response.data;
});

//contractById
export const contractById = createAsyncThunk("contract/id", async (id: number) => {
  const response = await axios.get(baseUrl + `Contract/${id}`);
  return response.data;
});


//addContract
export const addContract = createAsyncThunk(
    "contracts/addContract",
    async (addContractForm: FormVal) => {
      const response = await axios.post(baseUrl + "Contract/Add", addContractForm);
      return response.data;
    }
);

//updateContract
export const updateContract = createAsyncThunk(
    "contracts/updateContract",
    async (updateContractForm: FormVal) => {
      const response = await axios.put(baseUrl + "Contract/update", updateContractForm);
      return response.data;
    }
);
//deleteContract
export const deleteContract = createAsyncThunk(
    "contracts/deleteContract",
    async (key: number) => {
      const response = await axios.delete(baseUrl + `Contract/delete?Key=${key}`);
      return response.data;
    }
);



const initialState: contractState = {
  allContractPaging: {} as getAllContractPagingRes,
  allContract:[] as allContractItem[],
  loading: false,
  isOpenModal: false,
  current_page: 1,
  formValue: {} as FormVal,
};

const contractSlice = createSlice({
  name: "contractSlice",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isOpenModal = !state.isOpenModal;
    },
    openModal: (state) => {
      state.isOpenModal = true;
    },
    resetBranchState: (state) => {
      state.isOpenModal = false;
      state.current_page = 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllContractPagingService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllContractPagingService.fulfilled, (state, action) => {
      state.loading = false;
      state.allContractPaging = action.payload;
    });
    builder.addCase(getAllContractPagingService.rejected, (state) => {
      state.loading = false;
    });
    // ALL PROJECT WITHOUT PAGING

    builder.addCase(fetchAllContract.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllContract.fulfilled, (state, action) => {
      state.loading = false;
      state.allContract = action.payload;
    });
    builder.addCase(fetchAllContract.rejected, (state) => {
      state.loading = false;
    });
    //ContractById
    builder
        .addCase(contractById.pending, (state) => {
          state.loading = true;
        })
        .addCase(contractById.fulfilled, (state, action) => {
          state.loading = false;
          state.isOpenModal = true;
          state.formValue = action.payload;
        })
        .addCase(contractById.rejected, (state, action) => {
          state.loading = false;
        });
    // Add contract
    builder
        .addCase(addContract.pending, (state) => {
          state.loading = true;
        })
        .addCase(addContract.fulfilled, (state, action) => {
          state.loading = false;
          state.isOpenModal = false;
        })
        .addCase(addContract.rejected, (state, action) => {
          state.loading = false;
        });
    // Update contract
    builder
        .addCase(updateContract.pending, (state) => {
          state.loading = true;
        })
        .addCase(updateContract.fulfilled, (state, action) => {
          state.loading = false;
          state.isOpenModal = false;
        })
        .addCase(updateContract.rejected, (state, action) => {
          state.loading = false;
        });
    // Delete contract
    builder
        .addCase(deleteContract.pending, (state) => {
          state.loading = true;
        })
        .addCase(deleteContract.fulfilled, (state, action) => {
          state.loading = false;
        })
        .addCase(deleteContract.rejected, (state, action) => {
          state.loading = false;
        });
  },
});

export default contractSlice.reducer;

export const { toggleModal, openModal } = contractSlice.actions;