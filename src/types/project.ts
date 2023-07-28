import { ActionWithPayload, Action } from "../utils/reducer/reducer.utils";

export type getAllProjectItem = {
  key: number;
  name: string;
  address: string;
};

export type getAllProjectPagingRes = {
  items: getAllProjectItem[];
  index: number;
  size: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};
export type projectFormVal = {
  key: number;
  name: string;
  address: string;
};
export type projectState = {
  allProjectPaging: getAllProjectPagingRes;
  allProject: getAllProjectItem[];
  loading: boolean;
  isOpenModal: boolean;
  current_page: number;
  formValue: projectFormVal;
};

export type addProjectFormType = {
  name: string;
  adress: string | null;
};

export type updateProjectFormType = {
  key: number | null;
  name: string;
  adress: string | null;
};
