export type userContractTypeByUserType = {
    name: string;
    checked: boolean;
    key: number;
  };
export type userContractTypeUserAccess = {
    businessContractTypeName: string;
    businessContractTypeId: number;
    checked: boolean;
    key: number;
  };
  
  export type addUserContractTypeType = {
    userId: number | undefined;
    businessContractTypeId: number;
  };


