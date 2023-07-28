import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/url";
import {createAsyncThunk} from "@reduxjs/toolkit";

import {
    FormVal, getAllPaymentPagingRes, paymentState,
    filterState, allPaymentItem,
} from "../../../types/payment";

export const getAllPaymentPagingService = createAsyncThunk<
    getAllPaymentPagingRes,
    { page: number; pageSize: number; filterState: filterState }
    >("properties/getAllPaymentPaging", async ({ page, pageSize, filterState }) => {
    const response = await axios.post(
        baseUrl + `BusinessPayment/GetList/ByTenantDynamic?Page=${page}&PageSize=${pageSize}`,filterState
    );
    return response.data as getAllPaymentPagingRes;
});


// all BusinessPayment without paging
export const fetchAllPayment = createAsyncThunk("allPayment", async () => {
    const response = await axios.post(baseUrl + "BusinessPayment/GetList/BytenantNonPaging");
    return response.data;
});

//BusinessPaymentById
export const paymentById = createAsyncThunk("payment/id", async (id: number) => {
    const response = await axios.get(baseUrl + `BusinessPayment/${id}`);
    return response.data;
});


//addBusinessPayment
export const addPayment = createAsyncThunk(
    "payments/addPayment",
    async (addPaymentForm: FormVal) => {
        const response = await axios.post(baseUrl + "BusinessPayment/Add", addPaymentForm);
        return response.data;
    }
);

//updateBusinessPayment
export const updatePayment = createAsyncThunk(
    "payments/updatePayment",
    async (updatePaymentForm: FormVal) => {
        const response = await axios.put(baseUrl + "BusinessPayment/update", updatePaymentForm);
        return response.data;
    }
);
//deleteBusinessPayment
export const deletePayment = createAsyncThunk(
    "payments/deletePayment",
    async (key: number) => {
        const response = await axios.delete(baseUrl + `BusinessPayment/delete?Key=${key}`);
        return response.data;
    }
);



const initialState: paymentState = {
    allPaymentPaging: {} as getAllPaymentPagingRes,
    allPayment:[] as allPaymentItem[],
    loading: false,
    isOpenModal: false,
    current_page: 1,
    formValue: {} as FormVal,
};

const paymentBusinessSlice = createSlice({
    name: "paymentBusinessSlice",
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
        builder.addCase(getAllPaymentPagingService.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllPaymentPagingService.fulfilled, (state, action) => {
            state.loading = false;
            state.allPaymentPaging = action.payload;
        });
        builder.addCase(getAllPaymentPagingService.rejected, (state) => {
            state.loading = false;
        });
        // ALL PROJECT WITHOUT PAGING

        builder.addCase(fetchAllPayment.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAllPayment.fulfilled, (state, action) => {
            state.loading = false;
            state.allPayment = action.payload;
        });
        builder.addCase(fetchAllPayment.rejected, (state) => {
            state.loading = false;
        });
        //PaymentById
        builder
            .addCase(paymentById.pending, (state) => {
                state.loading = true;
            })
            .addCase(paymentById.fulfilled, (state, action) => {
                state.loading = false;
                state.isOpenModal = true;
                state.formValue = action.payload;
            })
            .addCase(paymentById.rejected, (state, action) => {
                state.loading = false;
            });
        // Add payment
        builder
            .addCase(addPayment.pending, (state) => {
                state.loading = true;
            })
            .addCase(addPayment.fulfilled, (state, action) => {
                state.loading = false;
                state.isOpenModal = false;
            })
            .addCase(addPayment.rejected, (state, action) => {
                state.loading = false;
            });
        // Update payment
        builder
            .addCase(updatePayment.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatePayment.fulfilled, (state, action) => {
                state.loading = false;
                state.isOpenModal = false;
            })
            .addCase(updatePayment.rejected, (state, action) => {
                state.loading = false;
            });
        // Delete payment
        builder
            .addCase(deletePayment.pending, (state) => {
                state.loading = true;
            })
            .addCase(deletePayment.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(deletePayment.rejected, (state, action) => {
                state.loading = false;
            });
    },
});

export default paymentBusinessSlice.reducer;

export const { toggleModal, openModal } = paymentBusinessSlice.actions;