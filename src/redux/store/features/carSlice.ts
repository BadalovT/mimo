import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  carFormVal,
  carState,
  createCarFormType,
  getAllCarRes,
  updateCarFormType,
} from "../../../types/car";
import { baseUrl } from "../../../utils/url";

type PagePageSizeType = {
  page: number;
  pageSize: number;
  obj: {};
};

export const getAllCar = createAsyncThunk<getAllCarRes, PagePageSizeType>(
  "getAllCar",
  async ({ page, pageSize, obj }) => {
    const response = await axios.post(
      baseUrl + `Car/GetList/ByTenantDynamic?Page=${page}&PageSize=${pageSize}`,
      obj
    );
    return response.data;
  }
);

export const getCarById = createAsyncThunk("carById", async (key: number) => {
  const response = await axios.get(baseUrl + `Car/${key}`);
  return response.data;
});

export const addCar = createAsyncThunk(
  "addCar",
  async (createCarForm: createCarFormType) => {
    const response = await axios.post(baseUrl + "Car/Add", createCarForm);
    return response.data;
  }
);

export const updateCar = createAsyncThunk(
  "updateCar",
  async (updateCarForm: updateCarFormType) => {
    const response = await axios.put(baseUrl + "Car/Update", updateCarForm);
    return response.data;
  }
);

export const deleteCar = createAsyncThunk("deleteCar", async (key: number) => {
  const response = await axios.delete(baseUrl + `Car/Delete?Key=${key}`);
  return response.data;
});

const initialState: carState = {
  allCar: {} as getAllCarRes,
  loading: false,
  statusCode: 0,
  isOpenModal: false,
  current_page: 1,
  formValue: {} as carFormVal,
};

const carSlice = createSlice({
  name: "carSlice",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isOpenModal = !state.isOpenModal;
      state.formValue = {} as carFormVal;
      state.statusCode = 0;
    },
  },
  extraReducers: (builder) => {
    // ALL CAR PAGING

    builder.addCase(getAllCar.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllCar.fulfilled, (state, action) => {
      state.loading = false;
      state.allCar = action.payload;
    });
    builder.addCase(getAllCar.rejected, (state) => {
      state.loading = true;
    });

    // CAR BY ID
    builder.addCase(getCarById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCarById.fulfilled, (state, action) => {
      state.loading = false;
      state.isOpenModal = true;
      state.formValue = action.payload;
    });
    builder.addCase(getCarById.rejected, (state) => {
      state.loading = false;
    });

    // ADD CAR

    builder.addCase(addCar.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addCar.fulfilled, (state, action) => {
      state.loading = false;
      state.isOpenModal = false;
    });
    builder.addCase(addCar.rejected, (state) => {
      state.loading = false;
    });

    // UPDATE CAR

    builder.addCase(updateCar.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCar.fulfilled, (state, action) => {
      state.loading = false;
      state.isOpenModal = false;
    });
    builder.addCase(updateCar.rejected, (state) => {
      state.loading = false;
    });

    // DELETE CAR

    builder.addCase(deleteCar.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCar.fulfilled, (state, action) => {
      state.loading = false;
      state.isOpenModal = false;
    });
    builder.addCase(deleteCar.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default carSlice.reducer;

export const { toggleModal } = carSlice.actions;
