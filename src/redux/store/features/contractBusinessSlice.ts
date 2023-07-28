import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/url";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  FormVal, getAllContractPagingRes, contractStateBusiness, 
  filterState, allContractItem,
} from "../../../types/contract";
import {FormValBusiness} from "../../../types/contract";

export const getAllContractBusinessPagingService = createAsyncThunk<
    getAllContractPagingRes,
    { page: number; pageSize: number; filterState: filterState }
>("properties/getAllContractBusinessPaging", async ({ page, pageSize, filterState }) => {
  const response = await axios.post(
      baseUrl + `BusinessContract/GetList/ByTenantDynamic?Page=${page}&PageSize=${pageSize}`,filterState
  );
  return response.data as getAllContractPagingRes;
});


// all contractBusiness without paging
export const fetchAllContractBusiness = createAsyncThunk("allContractBusiness", async () => {
  const response = await axios.post(baseUrl + "BusinessContract/GetList/BytenantNonPaging");
  return response.data;
});

//contractBusinessById
export const contractBusinessById = createAsyncThunk("contractBusiness/id", async (id: number) => {
  const response = await axios.get(baseUrl + `BusinessContract/${id}`);
  return response.data;
});


//addContractBusiness
export const addContractBusiness = createAsyncThunk(
    "contractBusinesss/addContractBusiness",
    async (addContractBusinessForm: FormVal) => {
      const response = await axios.post(baseUrl + "BusinessContract/Add", addContractBusinessForm);
      return response.data;
    }
);

//updateContractBusiness
export const updateContractBusiness = createAsyncThunk(
    "contractBusinesss/updateContractBusiness",
    async (updateContractBusinessForm: FormVal) => {
      const response = await axios.put(baseUrl + "BusinessContract/update", updateContractBusinessForm);
      return response.data;
    }
);
//deleteContractBusiness
export const deleteContractBusiness = createAsyncThunk(
    "contractBusinesss/deleteContractBusiness",
    async (key: number) => {
      const response = await axios.delete(baseUrl + `BusinessContract/delete?Key=${key}`);
      return response.data;
    }
);



const initialState: contractStateBusiness = {
  allContractPaging: {} as getAllContractPagingRes,
  allContract:[] as allContractItem[],
  loading: false,
  isOpenModal: false,
  current_page: 1,
  formValue: {} as FormValBusiness,
};

const contractBusinessSlice = createSlice({
  name: "contractBusinessSlice",
  initialState,
  reducers: {
    toggleModal: (state) => {
        console.log("toggleModal")
      state.isOpenModal = !state.isOpenModal;
        console.log(state.isOpenModal)
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
    builder.addCase(getAllContractBusinessPagingService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllContractBusinessPagingService.fulfilled, (state, action) => {
      state.loading = false;
      state.allContractPaging = action.payload;
    });
    builder.addCase(getAllContractBusinessPagingService.rejected, (state) => {
      state.loading = false;
    });
    // ALL PROJECT WITHOUT PAGING

    builder.addCase(fetchAllContractBusiness.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllContractBusiness.fulfilled, (state, action) => {
      state.loading = false;
      state.allContract = action.payload;
    });
    builder.addCase(fetchAllContractBusiness.rejected, (state) => {
      state.loading = false;
    });
    //ContractBusinessById
    builder
        .addCase(contractBusinessById.pending, (state) => {
          state.loading = true;
        })
        .addCase(contractBusinessById.fulfilled, (state, action) => {
          state.loading = false;
          state.isOpenModal = true;
          state.formValue = action.payload;
        })
        .addCase(contractBusinessById.rejected, (state, action) => {
          state.loading = false;
        });
    // Add contractBusiness
    builder
        .addCase(addContractBusiness.pending, (state) => {
          state.loading = true;
        })
        .addCase(addContractBusiness.fulfilled, (state, action) => {
          state.loading = false;
          state.isOpenModal = false;
        })
        .addCase(addContractBusiness.rejected, (state, action) => {
          state.loading = false;
        });
    // Update contractBusiness
    builder
        .addCase(updateContractBusiness.pending, (state) => {
          state.loading = true;
        })
        .addCase(updateContractBusiness.fulfilled, (state, action) => {
          state.loading = false;
          state.isOpenModal = false;
        })
        .addCase(updateContractBusiness.rejected, (state, action) => {
          state.loading = false;
        });
    // Delete contractBusiness
    builder
        .addCase(deleteContractBusiness.pending, (state) => {
          state.loading = true;
        })
        .addCase(deleteContractBusiness.fulfilled, (state, action) => {
          state.loading = false;
        })
        .addCase(deleteContractBusiness.rejected, (state, action) => {
          state.loading = false;
        });
  },
});

export default contractBusinessSlice.reducer;

export const { toggleModal, openModal } = contractBusinessSlice.actions;