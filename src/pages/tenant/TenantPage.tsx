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
  MoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import CrudDrawer from "../../components/drawer/CrudDrawer";
import { getAllRolePaging } from "../../types/role";
import TenantCrudForm from "./TenantCrudForm";

import { TenantTypeRes } from "../../types/lookUpType";
import { toggleModal } from "../../redux/store/features/tenantSlice";
import {
  deleteTenant,
  getAllTenant,
  tentantById,
  updateTenant,
} from "../../redux/store/features/tenantSlice";
import { getTenantType } from "../../redux/store/features/lookUpSlice";

const TenantPage = () => {
  const controller = "ŞİRKƏT HESABLARI";
  const [mode, setMode] = useState("new");
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  // const { allRolePaging } = useAppSelector((state) => state.roleReducer);
  const { allTenant, loading, formValue, isOpenModal } = useAppSelector(
    (state) => state.tenantSlice
  );
  const { allTenantType } = useAppSelector((state) => state.lookUpSlice);

  useEffect(() => {
    dispatch(getAllTenant({ page: 0, pageSize: 10, obj: {} }));

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
    dispatch(tentantById(record.key));
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

      <Popconfirm
        title={`Lahiyə: ${record.name}`}
        description="Silmək istədiyinizdən əminsiniz?"
        okText="Bəli"
        cancelText="Xeyr"
        onConfirm={() => {
          setMode("delete");
          dispatch(deleteTenant(record.key)).unwrap().then(() => {
            dispatch(getAllTenant({ page: 0, pageSize: 10, obj: {} }));
          });
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
    const values = await form.getFieldsValue();
    await form.validateFields();

    if (mode === "update") {
      const updateRoleForm = {
        key: formValue.key,
        name: values.name,
        tenantTypeId: values.tenantTypeId,
        tenantPhone: values.tenantPhone,
      };
      dispatch(updateTenant(updateRoleForm)).unwrap().then(() => {
        dispatch(getAllTenant({ page: 0, pageSize: 10, obj: {} }));
      } );
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
    },
    {
      title: "Tenant Növü",
      dataIndex: "tenantTypeName",
      key: "tenantTypeName",
    },
    {
      title: "Əlaqə Nömrəsi",
      dataIndex: "tenantPhone",
      key: "tenantPhone",
    },
  ];

  const onShowSizeChange = (newCurrent: number, newPageSize: number) => {
    if (pageSize !== newPageSize) {
      dispatch(getAllTenant({ page: 0, pageSize: newPageSize, obj: {} }));
    } else {
      dispatch(
        getAllTenant({ page: newCurrent - 1, pageSize: newPageSize, obj: {} })
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
          title="Şirkət Hesabları"
          className="flex-md-row flex-column align-md-items-center align-items-start border-bottom"
        >
          {/* <Row className="mx-0">
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
          </Row> */}
        </Card>

        <Table
          // scroll={{ x: 1300}}
          scroll={
            window.innerHeight > 900
              ? { x: 1300, y: window.innerHeight - 420 }
              : { x: 1300, y: 350 }
          }
          columns={column}
          dataSource={allTenant.items}
          pagination={false}
        />

        <Pagination
          // showQuickJumper
          showSizeChanger
          onChange={onShowSizeChange}
          pageSize={pageSize}
          current={current}
          total={allTenant.count}
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
        <TenantCrudForm form={form} mode={mode} allTenantType={allTenantType} />
      </CrudDrawer>
    </>
  );
};

export default TenantPage;
