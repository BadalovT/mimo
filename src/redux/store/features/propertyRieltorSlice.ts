import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/url";
import {createAsyncThunk} from "@reduxjs/toolkit";

import {
    FormValRieltor, getAllPropertyPagingRes, propertyStateRieltor, filterStateRieltor, allPropertyItem,
} from "../../../types/property";

export const getAllPropertyPagingService = createAsyncThunk<
    getAllPropertyPagingRes,
    { page: number; pageSize: number; filterState: filterStateRieltor }
    >("RieltorProperty/getAllPropertyPaging", async ({ page, pageSize, filterState }) => {
    const response = await axios.post(
        baseUrl + `RieltorProperty/GetList/ByTenantDynamic?Page=${page}&PageSize=${pageSize}`,filterState
    );
    return response.data as getAllPropertyPagingRes;
});

export const getAllPropertyPagingServiceByDynamic = createAsyncThunk<
    getAllPropertyPagingRes,
    { page: number; pageSize: number; filterState: filterStateRieltor }
    >("RieltorProperty/getAllPropertyPagingByDynamic", async ({ page, pageSize, filterState }) => {
    const response = await axios.post(
        baseUrl + `RieltorProperty/GetList/ByDynamic?Page=${page}&PageSize=${pageSize}`,filterState
    );
    return response.data as getAllPropertyPagingRes;
});

//propertyById
export const propertyById = createAsyncThunk("RieltorProperty/id", async (id: number) => {
    const response = await axios.get(baseUrl + `RieltorProperty/${id}`);
    return response.data;
});


//addProperty
export const addProperty = createAsyncThunk(
    "RieltorProperty/addProperty",
    async (addPropertyForm: FormValRieltor) => {
        const response = await axios.post(baseUrl + "RieltorProperty/Add", addPropertyForm);
        return response.data;
    }
);

//updateProperty
export const updateProperty = createAsyncThunk(
    "RieltorProperty/updateProperty",
    async (updatePropertyForm: FormValRieltor) => {
        const response = await axios.put(baseUrl + "RieltorProperty/update", updatePropertyForm);
        return response.data;
    }
);
//deleteProperty
export const deleteProperty = createAsyncThunk(
    "RieltorProperty/deleteProperty",
    async (key: number) => {
        const response = await axios.delete(baseUrl + `RieltorProperty/delete?Key=${key}`);
        return response.data;
    }
);






const initialState: propertyStateRieltor = {
    allPropertyPaging: {} as getAllPropertyPagingRes,
    allProperty:[] as allPropertyItem[],
    loading: false,
    isOpenModal: false,
    current_page: 1,
    formValue: {} as FormValRieltor,
};

const propertyRieltorSlice = createSlice({
    name: "propertyRieltorSlice",
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
        //getAllPropertyPagingServiceByDynamic
        builder.addCase(getAllPropertyPagingServiceByDynamic.pending, (state) => {
            state.loading = true;
        }   )
            .addCase(getAllPropertyPagingServiceByDynamic.fulfilled, (state, action) => {
                state.loading = false;
                state.allPropertyPaging = action.payload;
            }   )
            .addCase(getAllPropertyPagingServiceByDynamic.rejected, (state) => {
                state.loading = false;
            }   );

    },
});

export default propertyRieltorSlice.reducer;

export const { toggleModal, openModal } = propertyRieltorSlice.actions;