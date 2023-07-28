import { ActionWithPayload, Action } from "../utils/reducer/reducer.utils";

export type carType = {
  carNumber: string;
  projectId: number;
  fullName: string;
  phone: string;
  userName: null;
  key: number;
};

export type getAllCarRes = {
  items: carType[];
  index: number;
  size: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};

export type createCarFormType = {
  carNumber: string;
  projectId: number | null;
  fullName: string | null;
  phone: string | null;
};

export type updateCarFormType = {
  key: number | null;
  carNumber: string;
  projectId: number | null;
  fullName: string | null;
  phone: string | null;
};

export type carFormVal = {
  carNumber: string;
  projectId: number | null;
  fullName: string | null;
  phone: string | null;
  key: number;
};

export type carState = {
  allCar: getAllCarRes;
  loading: boolean;
  statusCode: number;
  isOpenModal: boolean;
  current_page: number;
  formValue: carFormVal;
};
