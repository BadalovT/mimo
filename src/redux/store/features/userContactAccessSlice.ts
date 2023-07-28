import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    userContactAccessItem,
    userContactAccessState,
    getAllMyContactsByDynamicType,
    allMyContactItem,
    getAllToSenderByDynamicType,
    allToSenderItem,
    getAllToReceiverByDynamicType,
    GetAllBusinessContractByUser,
    ByIdContractByPropertyDetail,
    ListContractByPaymentList,
    TenantPlanByUser,
    ListPlanByTenant, UserDetail,
} from "../../../types/userContactAccess";
import axios from "axios";
import { baseUrl } from "../../../utils/url";
import { error } from "console";
import {filterStateBusiness, getAllPropertyPagingRes} from "../../../types/property";

const initialState: userContactAccessState = {
  allUserContactAccess: [] as userContactAccessItem[],
    allMyContactsByDynamic: {} as getAllMyContactsByDynamicType,
    allToSenderByDynamic: {} as getAllToSenderByDynamicType,
    allReceiverByDynamic: {} as getAllToReceiverByDynamicType,
    allBusinessContractByUser: {} as GetAllBusinessContractByUser,
    ByIdContractByPropertyDetail: {} as ByIdContractByPropertyDetail,
    ListContractByPaymentList: [] as ListContractByPaymentList [],
    TenantPlanByUser: [] as TenantPlanByUser [],
    ListPlanByTenant: [] as ListPlanByTenant [],
    allToSender: [] as allToSenderItem[],
  allMyContacts: [] as allMyContactItem[],
    UserDetail: {} as UserDetail,
  loading: false,
    isOpenModal: false,
};


export const getAllMyContactsByDynamic = createAsyncThunk<
    getAllMyContactsByDynamicType,
    { page: number; pageSize: number; obj: {} }
>("UserContactAccess/GetList/MyContactsByDynamic", async ({ page, pageSize, obj }) => {
  const response = await axios.post(
      baseUrl + `UserContactAccess/GetList/MyContactsByDynamic?Page=${page}&PageSize=${pageSize}`,obj
  );
  return response.data as getAllMyContactsByDynamicType;
});

export const getAllToSenderByDynamic = createAsyncThunk<
    getAllToSenderByDynamicType,
    { page: number; pageSize: number; obj: {} }
>("UserContactAccess/GetList/ToSenderByDynamic", async ({ page, pageSize, obj }) => {
  const response = await axios.post(
      baseUrl + `UserContactAccess/GetList/ToSenderByDynamic?Page=${page}&PageSize=${pageSize}`,obj
  );
  return response.data as getAllToSenderByDynamicType;
});

export const GetListBusinessContractByUser = createAsyncThunk<
    GetAllBusinessContractByUser,
    { page: number; pageSize: number; obj: {} }
>("BusinessContract/GetListBusinessContractByUser", async ({ page, pageSize, obj }) => {
  const response = await axios.post(
      baseUrl + `BusinessContract/GetListBusinessContractByUser?Page=${page}&PageSize=${pageSize}`,obj
  );
  return response.data as GetAllBusinessContractByUser;
});

export const GetByIdContractByPropertyDetail = createAsyncThunk("BusinessContract/GetByIdContractByPropertyDetail/id", async (id: number) => {
    const response = await axios.get(baseUrl + `BusinessContract/GetByIdContractByPropertyDetail/${id}`);
    return response.data;
});

export const GetListContractByPaymentList = createAsyncThunk("BusinessContract/GetListContractByPaymentList/id", async (id: number) => {
    const response = await axios.get(baseUrl + `BusinessContract/GetListContractByPaymentList/${id}`);
    return response.data;
});

export const GetTenantPlanByUser = createAsyncThunk("TenantPlan/GetTenantPlanByUser", async () => {
    const response = await axios.get(baseUrl + `TenantPlan/GetTenantPlanByUser`);
    return response.data;
});

export const GetListPlanByTenant = createAsyncThunk("Plan/GetListPlanByTenant", async () => {
    const response = await axios.get(baseUrl + `Plan/GetListPlanByTenant`);
    return response.data;
});

export const GetUserDetail = createAsyncThunk("Users/GetDetail", async () => {
    const response = await axios.get(baseUrl + `Users/GetDetail`);
    return response.data;
});

export const deleteUserContact = createAsyncThunk(
    "UserContactAccess/delete",
    async (key: number) => {
        const response = await axios.delete(baseUrl + `UserContactAccess/delete?Key=${key}`);
        return response.data;
    }
);

export const approveUserContact = createAsyncThunk(
    "UserContactAccess/approve",
    async (key: number) => {
        const response = await axios.put(baseUrl + `UserContactAccess/ApproveContact${key}`);
        return response.data;
    }
);

export const getAllToReceiverByDynamic = createAsyncThunk<
    getAllToReceiverByDynamicType,
    { page: number; pageSize: number; obj: {} }
>("UserContactAccess/GetList/ToReceiverByDynamic", async ({ page, pageSize, obj }) => {
  const response = await axios.post(
      baseUrl + `UserContactAccess/GetList/ToReceiverByDynamic?Page=${page}&PageSize=${pageSize}`,obj
  );
  return response.data as getAllToSenderByDynamicType;
});


export const getAllUserContactAccess = createAsyncThunk(
  "allUserContactAccess",
  async () => {
    const response = await axios.get(
      baseUrl + "UserContactAccess/GetListContactAccess"
    );
    return response.data;
  }
);



const UserContactAccessSlice = createSlice({
  name: "userContactAccess",
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
        },
    },
  extraReducers: (builder) => {
    builder.addCase(getAllUserContactAccess.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllUserContactAccess.fulfilled, (state, action) => {
      state.loading = false;
      state.allUserContactAccess = action.payload;
    });
    builder.addCase(getAllUserContactAccess.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getAllMyContactsByDynamic.pending, (state) => {
        state.loading = true;
    })
    builder.addCase(getAllMyContactsByDynamic.fulfilled, (state, action) => {
        state.loading = false;
        state.allMyContactsByDynamic = action.payload;
    })
    builder.addCase(getAllMyContactsByDynamic.rejected, (state, action) => {
        state.loading = false;
    });
    builder.addCase(getAllToSenderByDynamic.pending, (state) => {
        state.loading = true;   })
    builder.addCase(getAllToSenderByDynamic.fulfilled, (state, action) => {
        state.loading = false;
        state.allToSenderByDynamic = action.payload;
    }   )
    builder.addCase(getAllToSenderByDynamic.rejected, (state, action) => {
        state.loading = false;
    }   );
    builder.addCase(getAllToReceiverByDynamic.pending, (state) => {
        state.loading = true;   })
    builder.addCase(getAllToReceiverByDynamic.fulfilled, (state, action) => {
        state.loading = false;
        state.allReceiverByDynamic = action.payload;
    }   )
    builder.addCase(getAllToReceiverByDynamic.rejected, (state, action) => {
        state.loading = false;
    }   );
    builder.addCase(deleteUserContact.pending, (state) => {
        state.loading = true;
    }   )
    builder.addCase(deleteUserContact.fulfilled, (state, action) => {
        state.loading = false;
    }   )
    builder.addCase(deleteUserContact.rejected, (state, action) => {
        state.loading = false;
    }   );
    builder.addCase(approveUserContact.pending, (state) => {
        state.loading = true;
    }   )
    builder.addCase(approveUserContact.fulfilled, (state, action) => {
        state.loading = false;
    }   )
    builder.addCase(approveUserContact.rejected, (state, action) => {
        state.loading = false;
    }   );
    builder.addCase(GetListBusinessContractByUser.pending, (state) => {
        state.loading = true;
    }   )
    builder.addCase(GetListBusinessContractByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.allBusinessContractByUser = action.payload;
    }   );
    builder.addCase(GetListBusinessContractByUser.rejected, (state, action) => {
        state.loading = false;
    }   );
    builder.addCase(GetByIdContractByPropertyDetail.pending, (state) => {
        state.loading = true;
    }   );
    builder.addCase(GetByIdContractByPropertyDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.isOpenModal = true;
        state.ByIdContractByPropertyDetail = action.payload;
    }   );
    builder.addCase(GetByIdContractByPropertyDetail.rejected, (state, action) => {
        state.loading = false;
    }   );
    builder.addCase(GetListContractByPaymentList.pending, (state) => {
        state.loading = true;
    }   );
    builder.addCase(GetListContractByPaymentList.fulfilled, (state, action) => {
        state.loading = false;
        state.ListContractByPaymentList = action.payload;
    }   );
    builder.addCase(GetTenantPlanByUser.rejected, (state, action) => {
        state.loading = false;
    }   );
    builder.addCase(GetTenantPlanByUser.pending, (state) => {
        state.loading = true;
    }   );
    builder.addCase(GetTenantPlanByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.TenantPlanByUser = action.payload;
    }   );
    builder.addCase(GetListPlanByTenant.rejected, (state, action) => {
        state.loading = false;
    }   );
    builder.addCase(GetListPlanByTenant.pending, (state) => {
        state.loading = true;
    }   );
    builder.addCase(GetListPlanByTenant.fulfilled, (state, action) => {
        state.loading = false;
        state.ListPlanByTenant = action.payload;
    }   );
    builder.addCase(GetUserDetail.rejected, (state, action) => {
        state.loading = false;
    }   );
    builder.addCase(GetUserDetail.pending, (state) => {
        state.loading = true;
    }   );
    builder.addCase(GetUserDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.UserDetail = action.payload;
    }   );
  },
});

export default UserContactAccessSlice.reducer;

export const { toggleModal, openModal } = UserContactAccessSlice.actions;
