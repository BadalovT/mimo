export type getAllRolePaging = {
  key: number;
  name: string;
  description: string;
  tenantTypeId: number;
};

export type getAllRolePagingRes = {
  items: getAllRolePaging[];
  index: number;
  size: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};

export type FormVal = {
  key?:number;
  tenantTypeId: number;
  name: string;
  description: string;
};

export type roleState = {
  allRolePaging: getAllRolePagingRes;
  loading: boolean;
  statusCode: number;
  isOpenModal: boolean;
  current_page: number;
  formValue: FormVal;
};

export type addRoleFormType = {
  name: string;
  tenantTypeId?: number;
  description?: string;
};

export type updateRoleFormType = {
  key: number | undefined;
  name: string;
  description?: string;
  tenantTypeId?: number;
};
