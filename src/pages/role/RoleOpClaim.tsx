import { Table } from "antd";
import React from "react";
import { roleOperationClaimsByRoleType } from "../../types/roleOperationClaim";

type Type = {
  roleOperationClaimsByRole: roleOperationClaimsByRoleType[];
  PermissionColumns: (
    | {
        title: string;
        dataIndex: string;
        render: (
          status: boolean,
          record: roleOperationClaimsByRoleType
        ) => JSX.Element;
      }
    | {
        title: string;
        dataIndex: string;
        render?: undefined;
      }
  )[];
};

const RoleOpClaim = ({ PermissionColumns, roleOperationClaimsByRole }: Type) => {
  return (
    <>
      <Table columns={PermissionColumns} dataSource={roleOperationClaimsByRole} />
    </>
  );
};

export default RoleOpClaim;
