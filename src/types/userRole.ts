export type userRoleByUserType = {
  name: string;
  checked: boolean;
  key: number;
};

export type addUserRoleType = {
  userId: number | undefined;
  roleId: number;
};
