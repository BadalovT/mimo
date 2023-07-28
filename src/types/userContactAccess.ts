export type userContactAccessItem = {
  userId: string;
  fullName: string;
  phone: string;
  email: string;
  key: number;
};

export type userContactAccessState = {
  allMyContacts: allMyContactItem[];
  allToSender: allToSenderItem[];
  allToSenderByDynamic: getAllToSenderByDynamicType;
  allMyContactsByDynamic: getAllMyContactsByDynamicType;
  allReceiverByDynamic: getAllToSenderByDynamicType;
  allUserContactAccess: userContactAccessItem[];
  allBusinessContractByUser: GetAllBusinessContractByUser;
  ByIdContractByPropertyDetail: ByIdContractByPropertyDetail;
  ListContractByPaymentList: ListContractByPaymentList[];
  TenantPlanByUser: TenantPlanByUser[];
  ListPlanByTenant  : ListPlanByTenant[];
  UserDetail: UserDetail;
  loading: boolean;
    isOpenModal: boolean;
};





export type allMyContactItem= {
    key: number;
    email?: string;
    fullName?: string;
    phone?: string;
    userId?: string;
};

export type getAllMyContactsByDynamicType = {
  items: allMyContactItem[];
  index: number;
  size: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};

export type allToSenderItem= {
  key: number;
  email?: string;
  fullName?: string;
  phone?: string;
  userId?: string;
};

export type getAllToSenderByDynamicType = {
  items: allToSenderItem[];
  index: number;
  size: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};

export type allToReceiverItem= {
  key: number;
  email?: string;
  fullName?: string;
  phone?: string;
  userId?: string;
};

export type getAllToReceiverByDynamicType = {
  items: allToReceiverItem[];
  index: number;
  size: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};

export type allBusinessContractByUserItem= {
  key: number;
  area?: number;
  blockName?: string;
  businessContractTypeName?: string;
  businessPropertyName?: string;
  comendantPrice?: number;
  contractAmount?: number;
  contractNo?: string;
  endDate?: string;
  floorName?: string;
  projectName?: string;
  roomName?: string;
  startDate?: string;
};

export type GetAllBusinessContractByUser = {
  items: allBusinessContractByUserItem[];
  index: number;
  size: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};

export type ByIdContractByPropertyDetail = {
  area: number;
  blockName: string;
  comendantPrice: number;
  floorName: string;
  key: number;
  name: string;
  projectName: string;
  roomName: string;
}

export type ListContractByPaymentList  = {
  businessContractName: string
  key : number
  monthId : number
  paymentAmount: number
  paymentDate: string
  year:string
}


export type TenantPlanByUser  = {
  key : number
  planName : string
  maxProperty : number
  maxUser : number
  price : number
  tenantId : number
}


export type ListPlanByTenant = {
  name: string;
  planName : string
  maxProperty : number
  maxUser : number
  price : number
  tenantId : number
}

export type UserDetail = {
    key: number;
  fullName: string;
    email: string;
    phone: string;
}




