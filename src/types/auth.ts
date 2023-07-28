export type LoginRes = {
  accessToken: string;
  refreshToken: string;
};

export type LoginForm = {
  email: string;
  password?: string;
};


export type RegisterForm = {
  email: string;
  fullName: string;
  phone: string;
  tenantName: string;
  tenantTypeId: number;
};
