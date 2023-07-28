export type roleOperationClaimsByRoleType = {
  name: string;
  checked: boolean;
  key: number;
};

export type addRoleOperationClaimsType = {
  roleId: number | undefined;
  operationClaimId: number;
};
