export type tenantItem = {
  name: string;
  tenantTypeName: null;
  tenantPhone: string;
  key: number;
};

export type getAllTenantPagingRes = {
  items: tenantItem[];
  index: number;
  size: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};

export type tenantFormVal = {
  name: string;
  tenantTypeName: null;
  tenantPhone: string;
  key: number;
};

export type updateTenantFormType = {
  name: string;
  tenantTypeId: null;
  tenantPhone: string;
  key: number;
};

export type tenantState = {
  allTenant: getAllTenantPagingRes;
  loading: boolean;
  statusCode: number;
  isOpenModal: boolean;
  current_page: number;
  formValue: tenantFormVal;
};
