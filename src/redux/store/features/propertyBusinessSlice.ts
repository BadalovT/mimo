import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/url";
import {createAsyncThunk} from "@reduxjs/toolkit";

import {
    FormValBusiness, getAllPropertyPagingRes, propertyStateBusiness, filterStateBusiness, allPropertyItem,
} from "../../../types/property";

export const getAllPropertyPagingService = createAsyncThunk<
    getAllPropertyPagingRes,
    { page: number; pageSize: number; filterState: filterStateBusiness }
    >("BusinessProperty/getAllPropertyPaging", async ({ page, pageSize, filterState }) => {
    const response = await axios.post(
        baseUrl + `BusinessProperty/GetList/ByTenantDynamic?Page=${page}&PageSize=${pageSize}`,filterState
    );
    return response.data as getAllPropertyPagingRes;
});

export const getAllPropertyPagingServiceByDynamic = createAsyncThunk<
    getAllPropertyPagingRes,
    { page: number; pageSize: number; filterState: filterStateBusiness }
    >("BusinessProperty/getAllPropertyPagingByDynamic", async ({ page, pageSize, filterState }) => {
    const response = await axios.post(
        baseUrl + `BusinessProperty/GetList/ByDynamic?Page=${page}&PageSize=${pageSize}`,filterState
    );
    return response.data as getAllPropertyPagingRes;
});

//propertyById
export const propertyById = createAsyncThunk("BusinessProperty/id", async (id: number) => {
    const response = await axios.get(baseUrl + `BusinessProperty/${id}`);
    return response.data;
});


//addProperty
export const addProperty = createAsyncThunk(
    "BusinessProperty/addProperty",
    async (addPropertyForm: FormValBusiness) => {
        const response = await axios.post(baseUrl + "BusinessProperty/Add", addPropertyForm);
        return response.data;
    }
);

//updateProperty
export const updateProperty = createAsyncThunk(
    "BusinessProperty/updateProperty",
    async (updatePropertyForm: FormValBusiness) => {
        const response = await axios.put(baseUrl + "BusinessProperty/update", updatePropertyForm);
        return response.data;
    }
);
//deleteProperty
export const deleteProperty = createAsyncThunk(
    "BusinessProperty/deleteProperty",
    async (key: number) => {
        const response = await axios.delete(baseUrl + `BusinessProperty/delete?Key=${key}`);
        return response.data;
    }
);

//priceDetail
export const priceDetail = createAsyncThunk("BusinessProperty/priceDetail", async (id: number) => {
    const response = await axios.get(baseUrl + `BusinessProperty/GetByIdPricedetail/${id}`);
    return response.data;
});

//priceDetail
export const comendantDetail = createAsyncThunk("BusinessProperty/comendantDetail", async (id: number) => {
    const response = await axios.get(baseUrl + `BusinessProperty/GetByIdComendantdetail/${id}`);
    return response.data;
});





const initialState: propertyStateBusiness = {
    allPropertyPaging: {} as getAllPropertyPagingRes,
    allProperty:[] as allPropertyItem[],
    loading: false,
    isOpenModal: false,
    current_page: 1,
    formValue: {} as FormValBusiness,
};

const propertyBusinessSlice = createSlice({
    name: "propertyBusinessSlice",
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
        builder.addCase(getAllPropertyPagingService.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllPropertyPagingService.fulfilled, (state, action) => {
            state.loading = false;
            state.allPropertyPaging = action.payload;
        });
        builder.addCase(getAllPropertyPagingService.rejected, (state) => {
            state.loading = false;
        });
        //PropertyById
        builder
            .addCase(propertyById.pending, (state) => {
                state.loading = true;
            })
            .addCase(propertyById.fulfilled, (state, action) => {
                state.loading = false;
                state.isOpenModal = true;
                state.formValue = action.payload;
            })
            .addCase(propertyById.rejected, (state, action) => {
                state.loading = false;
            });
        // Add property
        builder
            .addCase(addProperty.pending, (state) => {
                state.loading = true;
            })
            .addCase(addProperty.fulfilled, (state, action) => {
                state.loading = false;
                state.isOpenModal = false;
            })
            .addCase(addProperty.rejected, (state, action) => {
                state.loading = false;
            });
        // Update property
        builder
            .addCase(updateProperty.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProperty.fulfilled, (state, action) => {
                state.loading = false;
                state.isOpenModal = false;
            })
            .addCase(updateProperty.rejected, (state, action) => {
                state.loading = false;
            });
        // Delete property
        builder
            .addCase(deleteProperty.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProperty.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteProperty.rejected, (state, action) => {
                state.loading = false;
            });
        // PriceDetail
        builder
            .addCase(priceDetail.pending, (state) => {
                state.loading = true;
            })
            .addCase(priceDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.isOpenModal = true;
                state.formValue = action.payload;
            }         )
            .addCase(priceDetail.rejected, (state, action) => {
                state.loading = false;
            }      );
        // ComendantDetail
        builder
            .addCase(comendantDetail.pending, (state) => {
                state.loading = true;
            }   )
            .addCase(comendantDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.isOpenModal = true;
                state.formValue = action.payload;
            }   )
            .addCase(comendantDetail.rejected, (state, action) => {
                state.loading = false;
            }   );
        // getAllPropertyPagingServiceByDynamic
        builder
            .addCase(getAllPropertyPagingServiceByDynamic.pending, (state) => {
                state.loading = true;
            }   )
            .addCase(getAllPropertyPagingServiceByDynamic.fulfilled, (state, action) => {
                state.loading = false;
                state.allPropertyPaging = action.payload;
            }   )
            .addCase(getAllPropertyPagingServiceByDynamic.rejected, (state, action) => {
                state.loading = false;
            }   );

    },
});

export default propertyBusinessSlice.reducer;

export const { toggleModal, openModal } = propertyBusinessSlice.actions;