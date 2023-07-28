import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  BlockRes,
  BusinessContractTypeRes,
  CityRes,
  ContractTypeRes,
  FloorRes,
  lookUpState,
  MetroRes,
  MonthRes,
  PaymentTypeRes,
  ProjectRes,
  PropertyTypeRes,
  RoomRes,
  StateRes,
  TenantTypeRes,
} from "../../../types/lookUpType";
import { baseUrl } from "../../../utils/url";

export const blockService = createAsyncThunk<BlockRes>(
  "lookUp/BlockRes",
  async () => {
    const response = await axios.get(baseUrl + `LookUp/GetListBlock`);
    return response.data as BlockRes;
  }
);

export const floorService = createAsyncThunk<FloorRes>(
  "lookUp/FloorRes",
  async () => {
    const response = await axios.get(baseUrl + `LookUp/GetListFloor`);
    return response.data as FloorRes;
  }
);

export const cityService = createAsyncThunk<CityRes>(
  "lookUp/CityRes",
  async () => {
    const response = await axios.get(baseUrl + `LookUp/GetListCity`);
    return response.data as CityRes;
  }
);

export const contractTypeService = createAsyncThunk<ContractTypeRes>(
  "lookUp/ContractTypeRes",
  async () => {
    const response = await axios.get(baseUrl + `LookUp/GetListContractType`);
    return response.data as ContractTypeRes;
  }
);

export const paymentTypeService = createAsyncThunk<PaymentTypeRes>(
  "lookUp/PaymentTypeRes",
  async () => {
    const response = await axios.get(baseUrl + `LookUp/GetListPaymentType`);
    return response.data as PaymentTypeRes;
  }
);

export const propertyTypeService = createAsyncThunk<PropertyTypeRes>(
  "lookUp/PropertyTypeRes",
  async () => {
    const response = await axios.get(baseUrl + `LookUp/GetListPropertyType`);
    return response.data as PropertyTypeRes;
  }
);

export const metroService = createAsyncThunk<MetroRes>(
  "lookUp/MetroRes",
  async () => {
    const response = await axios.get(baseUrl + `LookUp/GetListMetro`);
    return response.data as MetroRes;
  }
);

export const roomService = createAsyncThunk<RoomRes>(
  "lookUp/RoomRes",
  async () => {
    const response = await axios.get(baseUrl + `LookUp/GetListRoom`);
    return response.data as RoomRes;
  }
);

export const monthService = createAsyncThunk<MonthRes>(
  "lookUp/MonthRes",
  async () => {
    const response = await axios.get(baseUrl + `LookUp/GetListMonth`);
    return response.data as MonthRes;
  }
);

export const stateService = createAsyncThunk<StateRes>(
  "lookUp/StateRes",
  async () => {
    const response = await axios.get(baseUrl + `LookUp/GetListState`);
    return response.data as StateRes;
  }
);

export const businessContractTypeService =
  createAsyncThunk<BusinessContractTypeRes>(
    "lookUp/BusinessContractTypeRes",
    async () => {
      const response = await axios.get(
        baseUrl + `LookUp/GetListBusinessContractType`
      );
      return response.data as BusinessContractTypeRes;
    }
  );

export const getTenantType = createAsyncThunk("getTenantType", async () => {
  const response = await axios.get(baseUrl + "LookUp/GetListTenantType");
  return response.data;
});

const initialState: lookUpState = {
  allTenantType: [],
  allBlock: [],
  allFloor: [],
  allRooms: [],
  allCity: [],
  allProject: [],
  allContractType: [] as ContractTypeRes[],
  allPaymentType: [] as PaymentTypeRes[],
  allPropertyType: [] as PropertyTypeRes[],
  allMetro: [] as MetroRes[],
  allMonth: [] as MonthRes[],
  allState: [] as StateRes[],
  allBusinessContractType: [] as BusinessContractTypeRes[],
  loading: false,
  statusCode: 0,
};

const lookUpSlice = createSlice({
  name: "lookUpSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTenantType.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTenantType.fulfilled, (state, action) => {
      state.loading = false;
      // @ts-ignore
      state.allTenantType = action.payload;
    });
    builder.addCase(getTenantType.rejected, (state, action) => {
      state.loading = false;
      state.statusCode = 1;
    });

    builder.addCase(blockService.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(blockService.fulfilled, (state, action) => {
      state.loading = false;
      // @ts-ignore
      state.allBlock = action.payload;
    });
    builder.addCase(blockService.rejected, (state, action) => {
      state.loading = false;
      state.statusCode = 1;
    });

    builder.addCase(floorService.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(floorService.fulfilled, (state, action) => {
      state.loading = false;
      // @ts-ignore
      state.allFloor = action.payload;
    });
    builder.addCase(floorService.rejected, (state, action) => {
      state.loading = false;
      state.statusCode = 1;
    });

    builder.addCase(cityService.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(cityService.fulfilled, (state, action) => {
      state.loading = false;
      // @ts-ignore
      state.allCity = action.payload;
    });
    builder.addCase(cityService.rejected, (state, action) => {
      state.loading = false;
      state.statusCode = 1;
    });

    builder.addCase(contractTypeService.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(contractTypeService.fulfilled, (state, action) => {
      state.loading = false;
      // @ts-ignore
      state.allContractType = action.payload;
    });
    builder.addCase(contractTypeService.rejected, (state, action) => {
      state.loading = false;
      state.statusCode = 1;
    });

    builder.addCase(paymentTypeService.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(paymentTypeService.fulfilled, (state, action) => {
      state.loading = false;
      // @ts-ignore
      state.allPaymentType = action.payload;
    });
    builder.addCase(paymentTypeService.rejected, (state, action) => {
      state.loading = false;
      state.statusCode = 1;
    });
    builder.addCase(propertyTypeService.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(propertyTypeService.fulfilled, (state, action) => {
      state.loading = false;
      // @ts-ignore
      state.allPropertyType = action.payload;
    });
    builder.addCase(propertyTypeService.rejected, (state, action) => {
      state.loading = false;
      state.statusCode = 1;
    });

    builder.addCase(metroService.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(metroService.fulfilled, (state, action) => {
      state.loading = false;
      // @ts-ignore
      state.allMetro = action.payload;
    });
    builder.addCase(metroService.rejected, (state, action) => {
      state.loading = false;
      state.statusCode = 1;
    });

    builder.addCase(monthService.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(monthService.fulfilled, (state, action) => {
      state.loading = false;
      // @ts-ignore
      state.allMonth = action.payload;
    });
    builder.addCase(monthService.rejected, (state, action) => {
      state.loading = false;
      state.statusCode = 1;
    });

    builder.addCase(stateService.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(stateService.fulfilled, (state, action) => {
      state.loading = false;
      // @ts-ignore
      state.allState = action.payload;
    });
    builder.addCase(stateService.rejected, (state, action) => {
      state.loading = false;
      state.statusCode = 1;
    });

    builder.addCase(businessContractTypeService.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(businessContractTypeService.fulfilled, (state, action) => {
      state.loading = false;
      // @ts-ignore
      state.allBusinessContractType = action.payload;
    });
    builder.addCase(businessContractTypeService.rejected, (state, action) => {
      state.loading = false;
      state.statusCode = 1;
    });
    builder.addCase(roomService.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(roomService.fulfilled, (state, action) => {
      state.loading = false;
      // @ts-ignore
      state.allRooms = action.payload;
    });
    builder.addCase(roomService.rejected, (state, action) => {
      state.loading = false;
      state.statusCode = 1;
    });
  },
});

export default lookUpSlice.reducer;
