export type userPropertyTypeByUser = {
  name: string;
  checked: boolean;
  key: number;
};

export type PropertyTypeRes = {
  key: number;
  propertyTypeName: string;
};

export type addUserPropertyTypeType = {
  userId: number | undefined;
  propertyTypeId: number;
};
