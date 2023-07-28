export type getAllUserItem = {
  fullName: string;
  phone: string;
  description: null;
  email: string;
  key: number;
};

export type getAllUserPagingRes = {
  items: getAllUserItem[];
  index: number;
  size: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};

export type userForm = {
  fullName: string;
  phone: string;
  description: null;
  email: string;
  key: number;
};

export type userState = {
  allUserPaging: getAllUserPagingRes;
  allUser: getAllUserItem[];
  loading: boolean;
  isOpenModal: boolean;
  current_page: number;
  formValue: userForm;
  mode: string;
};

export type addUserFormType = {
  fullName: string;
  phone: string;
  description: null;
  email: string;
};

export type updateUserFormType = {
  fullName: string;
  phone: string;
  description: null;
  email: string;
  status: boolean;
  key: number;
};
