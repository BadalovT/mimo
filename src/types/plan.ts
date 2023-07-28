import { ActionWithPayload, Action } from "../utils/reducer/reducer.utils";

export type getAllPlanPaging = {
  key: number;
  name: string;
  tenantTypeId: number;
  tenantTypeName: number | null;
  maxProperty: number | null;
  maxUser: number | null;
  price: number | null;
};

export type getAllPlanPagingRes = {
  items: getAllPlanPaging[];
  index: number;
  size: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};

export type planFormVal = {
  name: string;
  tenantTypeId: number;
  maxProperty: number;
  maxUser: number;
  price: number;
  key: number;
};

export type planState = {
  allPlanPaging: getAllPlanPagingRes;
  loading: boolean;
  statusCode: number;
  isOpenModal: boolean;
  current_page: number;
  formValue: planFormVal;
};

export type addPlanFormType = {
  name: string;
  tenantTypeId?: number;
  maxProperty?: number | null;
  maxUser?: number | null;
  price?: number | null;
};

export type updatePlanFormType = {
  key: number | null;
  name: string;
  tenantTypeId?: number;
  maxProperty: number | null;
  maxUser: number | null;
  price: number | null;
};
