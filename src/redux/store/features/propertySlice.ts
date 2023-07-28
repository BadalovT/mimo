import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/url";
import {createAsyncThunk} from "@reduxjs/toolkit";

import {
    FormVal, getAllPropertyPagingRes, propertyState,
    filterState, allPropertyItem,
} from "../../../types/property";

export const getAllPropertyPagingService = createAsyncThunk<
    getAllPropertyPagingRes,
    { page: number; pageSize: number; filterState: filterState }
    >("properties/getAllPropertyPaging", async ({ page, pageSize, filterState }) => {
    const response = await axios.post(
        baseUrl + `Property/GetList/ByTenantDynamic?Page=${page}&PageSize=${pageSize}`,filterState
    );
    return response.data as getAllPropertyPagingRes;
});

export const getAllPropertyPagingServiceByDynamic = createAsyncThunk<
    getAllPropertyPagingRes,
    { page: number; pageSize: number; filterState: filterState }
    >("properties/getAllPropertyPagingByDynamic", async ({ page, pageSize, filterState }) => {
    const response = await axios.post(
        baseUrl + `Property/GetList/ByDynamic?Page=${page}&PageSize=${pageSize}`,filterState
    );
    return response.data as getAllPropertyPagingRes;
});


// all property without paging
export const fetchAllProperty = createAsyncThunk("allProperty", async () => {
    const response = await axios.post(baseUrl + "Property/GetList/BytenantNonPaging");
    return response.data;
});

//propertyById
export const propertyById = createAsyncThunk("property/id", async (id: number) => {
    const response = await axios.get(baseUrl + `Property/${id}`);
    return response.data;
});


//addProperty
export const addProperty = createAsyncThunk(
    "propertys/addProperty",
    async (addPropertyForm: FormVal) => {
        const response = await axios.post(baseUrl + "Property/Add", addPropertyForm);
        return response.data;
    }
);

//updateProperty
export const updateProperty = createAsyncThunk(
    "propertys/updateProperty",
    async (updatePropertyForm: FormVal) => {
        const response = await axios.put(baseUrl + "Property/update", updatePropertyForm);
        return response.data;
    }
);
//deleteProperty
export const deleteProperty = createAsyncThunk(
    "propertys/deleteProperty",
    async (key: number) => {
        const response = await axios.delete(baseUrl + `Property/delete?Key=${key}`);
        return response.data;
    }
);



const initialState: propertyState = {
    allPropertyPaging: {} as getAllPropertyPagingRes,
    allProperty:[] as allPropertyItem[],
    loading: false,
    isOpenModal: false,
    current_page: 1,
    formValue: {} as FormVal,
};

const propertySlice = createSlice({
    name: "propertySlice",
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
        // ALL PROJECT WITHOUT PAGING

        builder.addCase(fetchAllProperty.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAllProperty.fulfilled, (state, action) => {
            state.loading = false;
            state.allProperty = action.payload;
        });
        builder.addCase(fetchAllProperty.rejected, (state) => {
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
        // Get All Property Paging By Dynamic
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

export default propertySlice.reducer;

export const { toggleModal, openModal } = propertySlice.actions;