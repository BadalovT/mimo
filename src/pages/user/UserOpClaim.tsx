import { Table, Tabs } from "antd";
import React from "react";
import { userRoleByUserType } from "../../types/userRole";
import { userProjectByUserType } from "../../types/userProject";
import { userContractTypeByUserType } from "../../types/userContractType";
import { userPropertyTypeByUser } from "../../types/userPropertyType";

type Type = {
  userRoleByUser: userRoleByUserType[];
  PermissionColumns: (
    | {
        title: string;
        dataIndex: string;
        render: (status: boolean, record: userRoleByUserType) => JSX.Element;
      }
    | {
        title: string;
        dataIndex: string;
        render?: undefined;
      }
  )[];
  UserProjectColumn: (
    | {
        title: string;
        dataIndex: string;
        render: (status: boolean, record: userRoleByUserType) => JSX.Element;
      }
    | {
        title: string;
        dataIndex: string;
        render?: undefined;
      }
  )[];
  userProjectByUser: userProjectByUserType[];
  UserContractTypeColumn: (
    | {
        title: string;
        dataIndex: string;
        render: (status: boolean, record: userRoleByUserType) => JSX.Element;
      }
    | {
        title: string;
        dataIndex: string;
        render?: undefined;
      }
  )[];
  userContractTypeByUser: userContractTypeByUserType[];
  userPropertyTypeByUser: userPropertyTypeByUser[];
  UserPropertyTypeColumn: ({
    title: string;
    dataIndex: string;
    render: (status: boolean, record: userRoleByUserType) => JSX.Element;
} | {
    title: string;
    dataIndex: string;
    render?: undefined;
})[]
};

const UserOpClaim = ({
  userProjectByUser,
  PermissionColumns,
  userRoleByUser,
  UserProjectColumn,
  UserContractTypeColumn,
  userContractTypeByUser,
  userPropertyTypeByUser,
  UserPropertyTypeColumn
}: Type) => {
  const items = [
    {
      label: "Səlahiyyət",
      key: "item-1",
      children: (
        <>
          <Table columns={PermissionColumns} dataSource={userRoleByUser} />
        </>
      ),
    }, // remember to pass the key prop
    {
      label: "Layihə",
      key: "item-2",
      children: (
        <>
          <Table columns={UserProjectColumn} dataSource={userProjectByUser} />
        </>
      ),
    },
    {
      label: "Kontrakt növü",
      key: "item-3",
      children: (
        <>
          <Table
            columns={UserContractTypeColumn}
            dataSource={userContractTypeByUser}
          />
        </>
      ),
    },
    {
      label: "Mulk növü",
      key: "item-4",
      children: (
        <>
          <Table
            columns={UserPropertyTypeColumn}
            dataSource={userPropertyTypeByUser}
          />
        </>
      ),
    },
  ];
  return (
    <>
      <Tabs items={items} />
      {/* <Table columns={PermissionColumns} dataSource={userRoleByUser} /> */}
    </>
  );
};

export default UserOpClaim;
