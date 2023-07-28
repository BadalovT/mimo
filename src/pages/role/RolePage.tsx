import {
  Button,
  Card,
  Col,
  Form,
  Pagination,
  PaginationProps,
  Popconfirm,
  Popover,
  Row,
  Space,
  Switch,
  Table,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
import FullWidthCard from "../../components/card/FullWidthCard";
import { Plus } from "react-feather";
import {
  DeleteOutlined,
  EditOutlined,
  KeyOutlined,
  MoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { baseUrl } from "../../utils/url";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import CrudDrawer from "../../components/drawer/CrudDrawer";
import { getAllRolePaging } from "../../types/role";
import RoleCrudForm from "./RoleCrudForm";
import {
  addRole,
  deleteRole,
  getAllRolePagingService,
  roleById,
  updateRole,
} from "../../redux/store/features/roleSlice";
import { TenantTypeRes } from "../../types/lookUpType";
import { toggleModal } from "../../redux/store/features/roleSlice";
import { getTenantType } from "../../redux/store/features/lookUpSlice";
import swal from "sweetalert";
import { roleOperationClaimsByRoleType } from "../../types/roleOperationClaim";
import {
  addRoleOperationClaims,
  deleteRoleOperationClaims,
  getRoleOperationClaimById,
} from "../../redux/store/features/roleOperationClaimSlice";
import RoleOpClaim from "./RoleOpClaim";
import {showInfo, showSuccess} from "../../utils/showMessage";

const Role = () => {
  const controller = "ROLE";
  const [mode, setMode] = useState("new");
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [roleKey, setRoleKey] = useState<number>();

  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const { allRolePaging, loading, isOpenModal, formValue } = useAppSelector(
    (state) => state.roleSlice
  );

  const { roleOperationClaimsByRole } = useAppSelector(
    (state) => state.roleOperationClaimSlice
  );

  const { allTenantType } = useAppSelector((state) => state.lookUpSlice);

  useEffect(() => {
    dispatch(getAllRolePagingService({ page: 0, pageSize: 10 }));
    dispatch(getTenantType());
  }, []);

  useEffect(() => {
    if (formValue.key) {
      form.setFieldsValue(formValue);
    } else {
      form.resetFields();
    }
  }, [formValue]);

  const showDrawer = (mode: string) => {
    dispatch(toggleModal());
    // setIsModalVisible(true);
    setMode(mode);
  };

  const roleByKey = (record: getAllRolePaging) => {
    showDrawer("update");
    dispatch(roleById(record.key));
  };
  const onRoleOpClaim = (record: TenantTypeRes) => {
    showDrawer("permission");
    setRoleKey(record.key);
    dispatch(getRoleOperationClaimById(record.key));
  };

  const getMenu = (record: getAllRolePaging) => (
    <ul className="dropDown">
      <li
        onClick={() => {
          roleByKey(record);
        }}
      >
        <button className="btn btn-outline-fff text-orange f-s-15">
          <EditOutlined style={{ marginRight: "10px" }} /> Yenilə
        </button>
      </li>
      <li
        onClick={() => {
          onRoleOpClaim(record);
        }}
      >
        <button className="btn btn-outline-fff text-orange f-s-15">
          <EditOutlined style={{ marginRight: "10px" }} /> Icazə ver
        </button>
      </li>
      <Popconfirm
        title={`Lahiyə: ${record.name}`}
        description="Silmək istədiyinizdən əminsiniz?"
        okText="Bəli"
        cancelText="Xeyr"
        onConfirm={() => {
          // dispatch(deleteRoleAction(record.key));
          dispatch(deleteRole(record.key)).unwrap().then((res) => {
            if (res) {
              showSuccess("Role silindi");
              dispatch(getAllRolePagingService({page: 0, pageSize: 10}));
            } else {
              showInfo("role silinə bilmədi")
            }
            setMode("delete");
          } );  }}
        // onCancel={cancel}
      >
        <li>
          <button className="btn btn-outline-fff text-red f-s-15">
            <DeleteOutlined style={{ marginRight: "10px" }} /> Sil
          </button>
        </li>
      </Popconfirm>
    </ul>
  );

  const handleOk = async () => {
    const values = await form.getFieldsValue();

    await form.validateFields();

    if (mode === "new") {
      if (values.tenantTypeId) {
        const addRoleForm = {
          name: values.name,
          tenantTypeId: values.tenantTypeId,
          description: values.description,
        };
        dispatch(addRole(addRoleForm)).unwrap().then((res) => {
            if (res) {
                showSuccess("Role əlavə edildi");
                dispatch(getAllRolePagingService({page: 0, pageSize: 10}));
            } else {
                showInfo("Role əlavə edilə bilmədi")
            }
            setMode("new");
        } );
      } else {
        const addRoleForm = {
          name: values.name,
          description: values.description,
        };
        dispatch(addRole(addRoleForm)).unwrap().then((res) => {
            if (res) {
                showSuccess("Role əlavə edildi");
                dispatch(getAllRolePagingService({page: 0, pageSize: 10}));
            } else {
                showInfo("Role əlavə edilə bilmədi")
            }
            setMode("new");
        } );
      }
    }
    if (mode === "update") {
      if (values.tenantTypeId) {
        const updateRoleForm = {
          key: formValue.key,
          name: values.name,
          description: values.description,
          tenantTypeId: values.tenantTypeId,
        };
        dispatch(updateRole(updateRoleForm)).unwrap().then((res) => {
            if (res) {
                showSuccess("Role yeniləndi");
                dispatch(getAllRolePagingService({page: 0, pageSize: 10}));
            } else {
                showInfo("Role yenilənə bilmədi")
            }
            setMode("update");
        } );
      } else {
        const updateRoleForm = {
          key: formValue.key,
          name: values.name,
          description: values.description,
        };
        dispatch(updateRole(updateRoleForm)).unwrap().then((res) => {
            if (res) {
                showSuccess("Role yeniləndi");
                dispatch(getAllRolePagingService({page: 0, pageSize: 10}));
            } else {
                showInfo("Role yenilənə bilmədi")
            }
            setMode("update");
        } );
      }
    }
  };

  const handleCancel = () => {
    form.resetFields();
    dispatch(toggleModal());
  };
  const column = [
    {
      key: "5",
      title: () => {
        return (
          <SettingOutlined className="f-s-15" style={{ marginRight: "10px" }} />
        );
      },
      // fixed: "right",
      width: 100,
      render: (record: getAllRolePaging) => {
        return (
          <>
            <Popover content={getMenu(record)} trigger="click">
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <MoreOutlined />
                </Space>
              </a>
            </Popover>
          </>
        );
      },
    },
    {
      title: "Ad",
      dataIndex: "name",
      key: "name",

      //   render: (text) => <a>{text}</a>,
    },
    {
      title: "Tenant Növü",
      dataIndex: "tenantTypeId",
      key: "tenantTypeId",
      render: (tenantTypeId: TenantTypeRes) => (
        <>
          {allTenantType.map((tenant: TenantTypeRes) => {
            if (+tenant.key === +tenantTypeId) {
              return <p key={tenant.key}>{tenant.name}</p>;
            }
          })}
        </>
      ),
    },
  ];

  const PermissionColumns = [
    {
      title: "Səlahiyyət",
      dataIndex: "checked",
      render: (status: boolean, record: roleOperationClaimsByRoleType) => {
        const onToggle = () => {
          if (status === false) {
            swal({
              title: "Diqqət!",
              text: "İstifadəçiyə səlahiyyət vermək istədiyinizdən əminsiniz?",
              icon: "warning",
              buttons: {
                cancel: true,
                confirm: true,
              },
              dangerMode: true,
            }).then((willAdd) => {
              if (willAdd) {
                const addUserOperationForm = {
                  roleId: roleKey,
                  operationClaimId: record.key,
                };
                // console.log("asda", accountKey);
                dispatch(addRoleOperationClaims(addUserOperationForm))
                  .unwrap()
                  .then((res) => {
                    if (res) {
                      dispatch(getRoleOperationClaimById(roleKey));
                    }
                  });
                // status = checked;
                swal({
                  title: "Əməliyyat icra olundu!",
                  text: "İstifadəçiyə səlahiyyət verildi!",
                  icon: "success",
                });
              } else {
                swal("Əməliyyat ləğv olundu!");
              }
            });
          } else {
            swal({
              title: "Diqqət!",
              text: "İstifadəçidən səlahiyyəti almaq istədiyinizdən əminsiniz?",
              icon: "warning",
              // buttons: true,
              dangerMode: true,
            }).then((willAdd) => {
              if (willAdd) {
                // console.log("asda", roleKey);
                dispatch(
                  deleteRoleOperationClaims({
                    RoleId: roleKey,
                    OperationClaimId: record.key,
                  })
                )
                  .unwrap()
                  .then((res) => {
                    if (res) {
                      dispatch(getRoleOperationClaimById(roleKey));
                    }
                  });
                // status = checked;
                swal({
                  title: "Əməliyyat icra olundu!",
                  text: "İstifadəçidən səlahiyyət alındı!",
                  icon: "success",
                });
              } else {
                swal("Əməliyyat ləğv olundu!");
              }
            });
          }

          // onActiveUser(index, status);
        };
        return (
          <Space>
            <Switch checked={status} onChange={onToggle} />
          </Space>
        );
      },
    },
    {
      title: "Ad",
      dataIndex: "name",
    },
  ];

  const onShowSizeChange = (newCurrent: number, newPageSize: number) => {
    if (pageSize !== newPageSize) {
      dispatch(getAllRolePagingService({ page: 0, pageSize: newPageSize }));
    } else {
      dispatch(
        getAllRolePagingService({ page: newCurrent - 1, pageSize: newPageSize })
      );
    }
    setPageSize(newPageSize);
    setCurrent(pageSize !== newPageSize ? 1 : newCurrent);
  };

  return (
    <>
      {/* <Helmet>
          <title>Layihə</title>
          <meta name="description" content="account page" />
          <link rel="canonical" href="/account" />
        </Helmet> */}
      <FullWidthCard>
        <Card
          title="Roleların Siyahısı"
          className="flex-md-row flex-column align-md-items-center align-items-start border-bottom"
        >
          <Row className="mx-0">
            <Col sm={12} md={18}>
              <div className=" mt-md-0 mt-0">
                <Button
                  onClick={() => showDrawer("new")}
                  className="ms-2"
                  color="primary"
                >
                  <Plus className="align-middle" size={15} />
                  <span className="align-middle ms-50">Əlavə Et</span>
                </Button>
              </div>
            </Col>
          </Row>
        </Card>

        <Table
          // scroll={{ x: 1300}}
          scroll={
            window.innerHeight > 900
              ? { x: 1300, y: window.innerHeight - 420 }
              : { x: 1300, y: 350 }
          }
          columns={column}
          dataSource={allRolePaging.items}
          pagination={false}
        />

        <Pagination
          // showQuickJumper
          showSizeChanger
          onChange={onShowSizeChange}
          pageSize={pageSize}
          current={current}
          total={allRolePaging.count}
          locale={{ items_per_page: "/ səhifə" }}
          style={{ padding: "12px" }}
        />
      </FullWidthCard>

      <CrudDrawer
        width={500}
        mode={mode}
        isOpenModal={isOpenModal}
        handleCancel={handleCancel}
        handleOk={handleOk}
        controller={controller}
        loading={loading}
      >
        {mode === "new" || mode === "update" ? (
          <RoleCrudForm form={form} mode={mode} allTenantType={allTenantType} />
        ) : (
          <RoleOpClaim
            PermissionColumns={PermissionColumns}
            roleOperationClaimsByRole={roleOperationClaimsByRole}
          />
        )}
      </CrudDrawer>
    </>
  );
};

export default Role;
