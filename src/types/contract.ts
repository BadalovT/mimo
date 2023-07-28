import {propertyFilterAction} from "./property";

export type allContractItem = {
  contractNo: string;
  contractAmount: number;
  startDate: Date;
  fullName: string;
  phone: string;
  key: number;
};

export type getAllContractPagingRes = {
  items: allContractItem[];
  index: number;
  size: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};

export type FormVal = {
  contractNo: string;
  contractTypeId: number;
  propertyId: number;
  startDate: Date;
  endDate: Date;
  contractAmount: number;
  fullName: string;
  phone: string;
  userId: number;
  key?: number;
};



export type FormValBusiness = {
  contractNo: string;
  businessContractTypeId: number;
  businessPropertyId: number;
  startDate: Date;
  endDate: Date;
  contractAmount: number;
  fullName: string;
  phone: string;
  userId: number;
  // signUserId: number;
  key?: number;
};

export type contractState = {
  allContractPaging: getAllContractPagingRes;
  allContract: allContractItem[];
  loading: boolean;
  // statusCode: number;
  isOpenModal: boolean;
  current_page: number;
  formValue: FormVal;
};

export type contractStateBusiness = Omit<contractState, "formValue"> & { formValue: FormValBusiness };



export type filterState = {
  filter: contractFilter;
} | {}

export type filterStateBusiness = {
    filter: contractFilterBusiness;
}


export type contractFilter = {
  field: string;
  operator: string;
  value: string;
  logic: string;
  filters: FilterStateType
};
export type contractFilterBusiness = Omit<contractFilter, "filters"> & { filters: FilterStateTypeBusiness };


export type contractFilterAction = {
  field: string;
  operator: string;
  value: string;
}

export type FilterStateType = {
  ContractNo: contractFilterAction;
  PropertyName: contractFilterAction;
  ContractTypeId: contractFilterAction;
  ContractAmount: contractFilterAction;
  StartDate: contractFilterAction;
  EndDate: contractFilterAction;
  FullName: contractFilterAction;
  Phone: contractFilterAction;
}

export type FilterStateTypeBusiness = {
  ContractNo: contractFilterAction;
  PropertyName: contractFilterAction;
  ContractTypeId: contractFilterAction;
  ContractAmount: contractFilterAction;
  StartDate: contractFilterAction;
  EndDate: contractFilterAction;
  FullName: contractFilterAction;
  Phone: contractFilterAction;
}


