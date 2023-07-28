export type allPropertyItem= {
  key: number;
  name?: string;
  area?: number;
  isRepair?:boolean;
};

export type getAllPropertyPagingRes = {
  items: allPropertyItem[];
  index: number;
  size: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};

// export type FormVal = {
//   name: string;
//   rentPrice: number;
//   area: number;
//   rentStatus:string;
//   propertyTypeName:string;
//   blockName:string;
//   cityName:string;
//   stateName:string;
//   metroName:string;
//   floorName:string;
//   roomName:string;
//   isRepair:boolean;
//   address:string;
//   description:string;
//   key?:number
// };

export type propertyState = {
  allPropertyPaging: getAllPropertyPagingRes;
  allProperty: allPropertyItem[];
  loading: boolean;
  isOpenModal: boolean;
  current_page: number;
  formValue: FormVal;
};

export type propertyStateBusiness = Omit<propertyState, "formValue"> & { formValue: FormValBusiness };

export type propertyStateRieltor = Omit<propertyState, "formValue"> & { formValue: FormValRieltor };



export type FormVal = {
  key?: number;
  name: string;
  rentPrice: number;
  area: number;
  rentStatus:string;
  propertyTypeId: number;
  blockId:number,
  cityId:number,
  stateId:number,
  metroId:number,
  floorId:number,
  roomId:number,
  isRepair:boolean;
  address:string;
  description:string;
};

export type FormValBusiness = {
    key?: number;
    rentPrice: number;
    salesPrice: number;
    comendantPrice: number;
    area: number;
    rentStatus:string;
    salesStatus:string;
    projectId: number;
    propertyTypeId: number;
    communalActive: boolean;
    blockId:number,
    floorId:number,
    roomId:number,
    isRepair:boolean;
    address:string;
    description:string;
};

export type FormValRieltor = {
    key?: number;
    propertyName: string;
    propertyUserName: string;
    propertyPhone: number;
    propertyAmount: number;
    contractTypeId: number;
    area: number;
    propertyTypeId: number;
    blockId: number;
    cityId: number;
    stateId: number;
    metroId: number;
    floorId: number;
    roomId: number;
    isRepair: boolean;
    address:string;
    description:string;
};

export type filterState = {
  filter: propertyFilter;
}|{}

export type filterStateBusiness = {
  filter: propertyFilterBusiness;
}|{}

export type filterStateRieltor = {
  filter: propertyFilterRieltor;
}|{}

export type propertyFilter = {
  field: string;
  operator: string;
  value: string;
  logic: string;
  filters: FilterStateType
};

export type propertyFilterBusiness = Omit<propertyFilter, "filters"> & { filters: FilterStateTypeBusiness };
export type propertyFilterRieltor = Omit<propertyFilter, "filters"> & { filters: FilterStateTypeRieltor };

export type propertyFilterAction ={
  field: string;
  operator: string;
  value: string;
}

export type FilterStateType = {
    name: propertyFilterAction;
    rentPrice: propertyFilterAction;
    area: propertyFilterAction;
    rentStatus: propertyFilterAction;
    propertyTypeId: propertyFilterAction;
    blockId: propertyFilterAction;
    cityId: propertyFilterAction;
    stateId: propertyFilterAction;
    metroId: propertyFilterAction;
    floorId: propertyFilterAction;
    roomId: propertyFilterAction;
    isRepair: propertyFilterAction;
}

export type FilterStateTypeBusiness = {
    name: propertyFilterAction;
    area: propertyFilterAction;
    projectId: propertyFilterAction;
    propertyTypeId: propertyFilterAction;
    communalActive: propertyFilterAction;
    rentPrice: propertyFilterAction;
    salesPrice: propertyFilterAction;
    rentStatus: propertyFilterAction;
    salesStatus: propertyFilterAction;
    blockId: propertyFilterAction;
    floorId: propertyFilterAction;
    roomId: propertyFilterAction;
    isRepair: propertyFilterAction;
    comendantPrice: propertyFilterAction;
}

export type FilterStateTypeRieltor = {
    propertyName: propertyFilterAction;
    propertyUserName: propertyFilterAction;
    propertyPhone: propertyFilterAction;
    propertyAmount: propertyFilterAction;
    contractTypeId: propertyFilterAction;
    propertyStatus: propertyFilterAction;
    area: propertyFilterAction;
    propertyTypeId: propertyFilterAction;
    blockId: propertyFilterAction;
    cityId: propertyFilterAction;
    stateId: propertyFilterAction;
    metroId: propertyFilterAction;
    floorId: propertyFilterAction;
    roomId: propertyFilterAction;
    isRepair: propertyFilterAction;
}
