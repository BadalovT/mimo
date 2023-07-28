export type TenantTypeRes = {
  key: number;
  name: string;
};

export type BlockRes = {
  key: number;
  name: string;
};

export type FloorRes = {
  key: number;
  name: string;
};

export type CityRes = {
  key: number;
  name: string;
};

export type ContractTypeRes = {
  key: number;
  name: string;
};

export type PaymentTypeRes = {
  key: number;
  name: string;
};

export type PropertyTypeRes = {
  key: number;
  name: string;
};

export type MetroRes = {
  key: number;
  name: string;
};

export type MonthRes = {
  key: number;
  name: string;
};

export type StateRes = {
  key: number;
  name: string;
};

export type RoomRes = {
  key: number;
  name: string;
};

export type ProjectRes = {
  key: number;
  name: string;
};

export type BusinessContractTypeRes = {
  key: number;
  name: string;
};


export type lookUpState = {
  allTenantType: TenantTypeRes[];
  allBlock: BlockRes[];
  allFloor: FloorRes[];
  allRooms: RoomRes[];
  allProject: ProjectRes[];
  allCity: CityRes[];
  allContractType: ContractTypeRes[];
  allPaymentType: PaymentTypeRes[];
  allPropertyType: PropertyTypeRes[];
  allMetro: MetroRes[];
  allMonth: MonthRes[];
  allState: StateRes[];
  allBusinessContractType: BusinessContractTypeRes[];
  loading: boolean;
  statusCode: number;
};