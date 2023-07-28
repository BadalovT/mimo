import { combineReducers } from "redux";
import NavbarReducer from "../reducers/NavbarReducer";
import { configureStore } from "@reduxjs/toolkit";
import planSlice from "./features/planSlice";
import roleSlice from "./features/roleSlice";
import projectSlice from "./features/projectSlice";
import carSlice from "./features/carSlice";
import lookUpSlice from "./features/lookUpSlice";
import authSlice from "./features/authSlice";
import propertySlice from "./features/propertySlice";
import tenantSlice from "./features/tenantSlice";
import operationClaimSlice from "./features/operationClaims";
import roleOperationClaimSlice from "./features/roleOperationClaimSlice";
import userSlice from "./features/userSlice";
import userOperationClaimSlice from "./features/userRole";
import contractSlice from "./features/contractSlice";
import userContactAccessSlice from "./features/userContactAccessSlice";
import contractBusinessSlice from "./features/contractBusinessSlice";
import propertyBusinessSlice from "./features/propertyBusinessSlice";
import propertyRieltorSlice from "./features/propertyRieltorSlice";
import paymentSlice from "./features/paymentSlice";
import userProjectSlice from "./features/userProjectSlice";
import userContractTypeSlice from "./features/userContractTypeSlice";
import userPropertyTypeSlice from "./features/userPropertyTypeSlice";
import paymentBusinessSlice from "./features/paymentBusinessSlice";
export const store = configureStore({
  reducer: {
    NavbarReducer,
    projectSlice,
    planSlice,
    roleSlice,
    carSlice,
    lookUpSlice,
    authSlice,
    propertySlice,
    tenantSlice,
    operationClaimSlice,
    roleOperationClaimSlice,
    userSlice,
    userOperationClaimSlice,
    contractSlice,

    userContactAccessSlice,

    contractBusinessSlice,

    propertyBusinessSlice,
    propertyRieltorSlice,
    paymentSlice,
    paymentBusinessSlice,
    userProjectSlice,
    userContractTypeSlice,
    userPropertyTypeSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
