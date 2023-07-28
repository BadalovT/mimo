import {
  Button,
  Card,
  Col,
  Form,
  Pagination,
  Popconfirm,
  Popover,
  Row,
  Space,
  Switch,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
import FullWidthCard from "../../components/card/FullWidthCard";
import { Plus } from "react-feather";
import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { baseUrl } from "../../utils/url";
import { useAppDispatch, useAppSelector } from "../../redux/hook";

import CrudDrawer from "../../components/drawer/CrudDrawer";

import { getAccessToken } from "../../utils/token/getAccessClaims";

import { showDrawer, toggleModal } from "../../redux/store/features/userSlice";
import UserCrudForm from "./UserCrudForm";
import {
  addUser,
  deleteUser,
  getAllUserPaging,
  getUserById,
  updateUser,
} from "../../redux/store/features/userSlice";
import { getAllUserItem } from "../../types/user";
import swal from "sweetalert";
import { userRoleByUserType } from "../../types/userRole";
import {
  addUserRole,
  deleteUserRole,
  getUserRoleById,
} from "../../redux/store/features/userRole";
import UserOpClaim from "./UserOpClaim";
import {
  addUserProject,
  deleteUserProject,
  getUserProjectById,
} from "../../redux/store/features/userProjectSlice";
import {
  addUserContractType,
  deleteUserContractType,
  getUserContractTypeById,
} from "../../redux/store/features/userContractTypeSlice";
import { addUserPropertyType, deleteUserPropertyType, getUserPropertyTypeById } from "../../redux/store/features/userPropertyTypeSlice";

const UserPage = () => {
  const controller = "İSTİFADƏÇİ";
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [userId, setUserId] = useState<number>();

  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const { allUserPaging, loading, isOpenModal, formValue, mode } =
    useAppSelector((state) => state.userSlice);

  const { userRoleByUser } = useAppSelector(
    (state) => state.userOperationClaimSlice
  );

  const { userProjectByUser } = useAppSelector(
    (state) => state.userProjectSlice
  );
  const { userContractTypeByUser } = useAppSelector(
    (state) => state.userContractTypeSlice
  );

  const { userPropertyTypeByUser } = useAppSelector(
    (state) => state.userPropertyTypeSlice
  );

  useEffect(() => {
    dispatch(getAllUserPaging({ page: 0, pageSize: 10, obj: {} }));
  }, []);

  useEffect(() => {
    if (formValue.key) {
      form.setFieldsValue(formValue);
    } else {
      form.resetFields();
    }
  }, [formValue]);

  // const showDrawer = (mode: string) => {
  //   dispatch(toggleModal());
  //   setMode(mode);
  // };

  const userByKey = (record: getAllUserItem) => {
    dispatch(showDrawer("update"));
    dispatch(getUserById(record.key));
  };
  const onUserOpClaim = (record: getAllUserItem) => {
    dispatch(showDrawer("permission"));
    setUserId(record.key);
    dispatch(getUserRoleById(record.key));
    dispatch(getUserProjectById());
    dispatch(getUserContractTypeById());
    dispatch(getUserPropertyTypeById())
  };
  const getMenu = (record: getAllUserItem) => (
    <ul className="dropDown">
      <li
        onClick={() => {
          userByKey(record);
        }}
      >
        <button className="btn btn-outline-fff text-orange f-s-15">
          <EditOutlined style={{ marginRight: "10px" }} /> Yenilə
        </button>
      </li>
      <li
        onClick={() => {
          onUserOpClaim(record);
        }}
      >
        <button className="btn btn-outline-fff text-orange f-s-15">
          <EditOutlined style={{ marginRight: "10px" }} /> Icazə ver
        </button>
      </li>
      <Popconfirm
        title={`Lahiyə: ${record.fullName}`}
        description="Silmək istədiyinizdən əminsiniz?"
        okText="Bəli"
        cancelText="Xeyr"
        onConfirm={() => {
          // dispatch(deletePlanAction(record.key));
          dispatch(deleteUser(record.key));
        }}
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
    await form.validateFields();

    const values = await form.getFieldsValue();
    if (mode === "new") {
      const addPlanForm = {
        fullName: values.fullName,
        phone: values.phone,
        description: values.description,
        email: values.email,
      };
      dispatch(addUser(addPlanForm)).unwrap().then(() => {
        dispatch(getAllUserPaging({ page: 0, pageSize: 10, obj: {} }));
      } );
    }
    if (mode === "update") {
      const updatePlanForm = {
        key: formValue.key,
        fullName: values.fullName,
        phone: values.phone,
        description: values.description,
        email: values.email,
        status: values.status,
      };
      // dispatch(updatePlanAction(updatePlanForm));
      dispatch(updateUser(updatePlanForm)).unwrap().then(() => {
        dispatch(getAllUserPaging({ page: 0, pageSize: 10, obj: {} }));
      } );
    }
  };

  const handleCancel = () => {
    form.resetFields();
    dispatch(toggleModal());
    // setMode("new");
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
      render: (record: getAllUserItem) => {
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
      title: "Tam Ad",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Nömrə",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Açıqlama",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  const PermissionColumns = [
    {
      title: "Səlahiyyət",
      dataIndex: "checked",
      render: (status: boolean, record: userRoleByUserType) => {
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
                  userId: userId,
                  roleId: record.key,
                };
                // console.log("asda", accountKey);
                dispatch(addUserRole(addUserOperationForm))
                  .unwrap()
                  .then((res) => {
                    if (res) {
                      dispatch(getUserRoleById(userId));
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
                  deleteUserRole({
                    UserId: userId,
                    RoleId: record.key,
                  })
                )
                  .unwrap()
                  .then((res) => {
                    if (res) {
                      dispatch(getUserRoleById(userId));
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
      dispatch(getAllUserPaging({ page: 0, pageSize: newPageSize, obj: {} }));
    } else {
      dispatch(
        getAllUserPaging({
          page: newCurrent - 1,
          pageSize: newPageSize,
          obj: {},
        })
      );
    }
    setPageSize(newPageSize);
    setCurrent(pageSize !== newPageSize ? 1 : newCurrent);
  };

  const UserProjectColumn = [
    {
      title: "Səlahiyyət",
      dataIndex: "checked",
      render: (status: boolean, record: userRoleByUserType) => {
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
                  userId: userId,
                  projectId: record.key,
                };
                // console.log("asda", accountKey);
                dispatch(addUserProject(addUserOperationForm))
                  .unwrap()
                  .then((res) => {
                    if (res) {
                      dispatch(getUserProjectById());
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
                  deleteUserProject({
                    UserId: userId,
                    projectId: record.key,
                  })
                )
                  .unwrap()
                  .then((res) => {
                    if (res) {
                      dispatch(getUserProjectById());
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

  const UserContractTypeColumn = [
    {
      title: "Səlahiyyət",
      dataIndex: "checked",
      render: (status: boolean, record: userRoleByUserType) => {
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
                  userId: userId,
                  businessContractTypeId: record.key,
                };
                // console.log("asda", accountKey);
                dispatch(addUserContractType(addUserOperationForm))
                  .unwrap()
                  .then((res) => {
                    if (res) {
                      dispatch(getUserContractTypeById());
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
                  deleteUserContractType({
                    UserId: userId,
                    BusinessContractTypeId: record.key,
                  })
                )
                  .unwrap()
                  .then((res) => {
                    if (res) {
                      dispatch(getUserContractTypeById());
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

  const UserPropertyTypeColumn = [
    {
      title: "Səlahiyyət",
      dataIndex: "checked",
      render: (status: boolean, record: userRoleByUserType) => {
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
                  userId: userId,
                  propertyTypeId: record.key,
                };
                // console.log("asda", accountKey);
                dispatch(addUserPropertyType(addUserOperationForm))
                  .unwrap()
                  .then((res) => {
                    if (res) {
                      dispatch(getUserPropertyTypeById());
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
                  deleteUserPropertyType({
                    UserId: userId,
                    PropertyTypeId: record.key,
                  })
                )
                  .unwrap()
                  .then((res) => {
                    if (res) {
                      dispatch(getUserPropertyTypeById());
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
  return (
    <>
      {/* <Helmet>
            <title>Layihə</title>
            <meta name="description" content="account page" />
            <link rel="canonical" href="/account" />
          </Helmet> */}
      <FullWidthCard>
        <Card
          title="İstifadəçi Siyahısı"
          className="flex-md-row flex-column align-md-items-center align-items-start border-bottom"
        >
          <Row className="mx-0">
            <Col sm={12} md={18}>
              <div className=" mt-md-0 mt-0">
                <Button
                  onClick={() => dispatch(showDrawer("new"))}
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
          dataSource={allUserPaging.items}
          pagination={false}
        />

        <Pagination
          // showQuickJumper
          showSizeChanger
          onChange={onShowSizeChange}
          pageSize={pageSize}
          current={current}
          total={allUserPaging.count}
          locale={{ items_per_page: "/ səhifə" }}
          style={{ padding: "12px" }}
        />
      </FullWidthCard>

      <CrudDrawer
        width={500}
        mode={mode}
        handleCancel={handleCancel}
        handleOk={handleOk}
        controller={controller}
        loading={loading}
        isOpenModal={isOpenModal}
      >
        {mode === "new" || mode === "update" ? (
          <UserCrudForm form={form} mode={mode} />
        ) : (
          <UserOpClaim
            PermissionColumns={PermissionColumns}
            userRoleByUser={userRoleByUser}
            UserProjectColumn={UserProjectColumn}
            userProjectByUser={userProjectByUser}
            UserContractTypeColumn={UserContractTypeColumn}
            userContractTypeByUser={userContractTypeByUser}
            userPropertyTypeByUser={userPropertyTypeByUser}
            UserPropertyTypeColumn={UserPropertyTypeColumn}
          />
        )}
      </CrudDrawer>
    </>
  );
};

export default UserPage;
