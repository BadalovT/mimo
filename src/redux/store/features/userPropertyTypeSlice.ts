import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addUserPropertyTypeType,
  userPropertyTypeByUser,
} from "../../../types/userPropertyType";
import axios from "axios";
import { baseUrl } from "../../../utils/url";
import {PropertyTypeRes} from "../../../types/userPropertyType";

export type stateType = {
  loading: boolean;
  userPropertyTypeByUser: userPropertyTypeByUser[];
  allPropertyType:  PropertyTypeRes[],
};

const initialState: stateType = {
  loading: false,
  userPropertyTypeByUser: [] as userPropertyTypeByUser[],
  allPropertyType: [] as PropertyTypeRes[],
};

export const propertyTypeService = createAsyncThunk<PropertyTypeRes>(
    "lookUp/PropertyTypeRes",
    async () => {
      const response = await axios.get(baseUrl + `UserPropertyType/GetListUserAccess`);
      return response.data as PropertyTypeRes;
    }
);

export const getUserPropertyTypeById = createAsyncThunk(
  "getUserPropertyTypeById",
  async () => {
    const response = await axios.get(
      baseUrl + `UserPropertyType/GetListNonPagingById`
    );
    return response.data;
  }
);

export const addUserPropertyType = createAsyncThunk(
  "addUserPropertyType",
  async (addUserPropertyType: addUserPropertyTypeType) => {
    const response = await axios.post(
      baseUrl + "UserPropertyType/Add",
      addUserPropertyType
    );
    return response.data;
  }
);

export const deleteUserPropertyType = createAsyncThunk<
  number,
  { UserId: number | undefined; PropertyTypeId: number }
>("deleteUserPropertyType", async ({ UserId, PropertyTypeId }) => {
  const response = await axios.delete(
    baseUrl +
      `UserPropertyType/Delete?UserId=${UserId}&PropertyTypeId=${PropertyTypeId}`
  );
  return response.data;
});

const userPropertyTypeSlice = createSlice({
  name: "userContractType",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserPropertyTypeById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserPropertyTypeById.fulfilled, (state, action) => {
      state.loading = false;
      state.userPropertyTypeByUser = action.payload;
    });
    builder.addCase(getUserPropertyTypeById.rejected, (state) => {
      state.loading = false;
    });

    //ADD
    builder.addCase(addUserPropertyType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addUserPropertyType.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(addUserPropertyType.rejected, (state) => {
      state.loading = false;
    });

    //DELETE
    builder.addCase(deleteUserPropertyType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUserPropertyType.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteUserPropertyType.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(propertyTypeService.pending, (state) => {
      state.loading = true;
    } );
    builder.addCase(propertyTypeService.fulfilled, (state, action) => {
      state.loading = false;
      // @ts-ignore
      state.allPropertyType = action.payload;
    });
    builder.addCase(propertyTypeService.rejected, (state) => {
      state.loading = false;
    } );
  },
});

export default userPropertyTypeSlice.reducer;
