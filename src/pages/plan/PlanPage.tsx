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

import { getAccessToken } from "../../utils/token/getAccessClaims";

import { getAllPlanPaging } from "../../types/plan";
import PlanCrudForm from "./PlanCrudForm";
import {
  addPlan,
  deletePlan,
  getAllPlanPagingService,
  planById,
  updatePlan,
} from "../../redux/store/features/planSlice";
import { toggleModal } from "../../redux/store/features/planSlice";
import { getTenantType } from "../../redux/store/features/lookUpSlice";
import {showInfo, showSuccess} from "../../utils/showMessage";

const PlanPage = () => {
  const controller = "PLAN";
  const [mode, setMode] = useState("new");
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  // const { allPlanPaging } = useAppSelector((state) => state.planReducer);
  const { allPlanPaging, loading, isOpenModal, formValue } = useAppSelector(
    (state) => state.planSlice
  );
  const { allTenantType } = useAppSelector((state) => state.lookUpSlice);

  useEffect(() => {
    // dispatch(getAllPlanPagingAction(0, 10));
    dispatch(getAllPlanPagingService({ page: 0, pageSize: 10 }));
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
    setMode(mode);
  };

  const planByKey = (record: getAllPlanPaging) => {
    showDrawer("update");
    dispatch(planById(record.key));
  };

  const getMenu = (record: getAllPlanPaging) => (
    <ul className="dropDown">
      <li
        onClick={() => {
          planByKey(record);
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
          // dispatch(deletePlanAction(record.key));
          dispatch(deletePlan(record.key)).unwrap().then((res) => {
                if (res) {
                    showSuccess("Plan uğurla silindi")
                    dispatch(getAllPlanPagingService({ page: 0, pageSize: 10 }));
                } else {
                    showInfo("Plan silinə bilmədi")
                }
          setMode("delete");
        }) } }

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
      const addPlanForm = values;

      if (values.tenantTypeId) {
        const addPlanForm = {
          name: values.name,
          tenantTypeId: values.tenantTypeId,
          maxProperty: values.maxProperty,
          maxUser: values.maxUser,
          price: values.price,
        };
        dispatch(addPlan(addPlanForm)).unwrap().then((res) => {
            if (res) {
              showSuccess("Plan uğurla əlavə edildi")
              dispatch(getAllPlanPagingService({ page: 0, pageSize: 10 }));
            } else {
              showInfo("Plan əlavə edilə bilmədi")
            }
        } );
      } else {
        const addPlanForm = {
          name: values.name,
          maxProperty: values.maxProperty,
          maxUser: values.maxUser,
          price: values.price,
        };
        dispatch(addPlan(addPlanForm)).unwrap().then((res) => {
            if (res) {
                showSuccess("Plan uğurla əlavə edildi")
                dispatch(getAllPlanPagingService({ page: 0, pageSize: 10 }));
            } else {
                showInfo("Plan əlavə edilə bilmədi")
            }
        } );
      }
    }
    if (mode === "update") {
      if (values.tenantTypeId) {
        const updatePlanForm = {
          key: formValue.key,
          name: values.name,
          tenantTypeId: values.tenantTypeId,
          maxProperty: values.maxProperty,
          maxUser: values.maxUser,
          price: values.price,
        };
        dispatch(updatePlan(updatePlanForm)).unwrap().then((res) => {
            if (res) {
                showSuccess("Plan uğurla yeniləndi")
                dispatch(getAllPlanPagingService({ page: 0, pageSize: 10 }));
            } else {
                showInfo("Plan yenilənə bilmədi")
            }
        } );
      } else {
        const updatePlanForm = {
          key: formValue.key,
          name: values.name,
          maxProperty: values.maxProperty,
          maxUser: values.maxUser,
          price: values.price,
        };
        // dispatch(updatePlanAction(updatePlanForm));
        dispatch(updatePlan(updatePlanForm)).unwrap().then((res) => {
            if (res) {
                showSuccess("Plan uğurla yeniləndi")
                dispatch(getAllPlanPagingService({ page: 0, pageSize: 10 }));
            } else {
                showInfo("Plan yenilənə bilmədi")
            }
        } );
      }
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
      render: (record: getAllPlanPaging) => {
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
      dataIndex: "tenantTypeName",
      key: "tenantTypeName",
    },
    {
      title: "Mülk Növü",
      dataIndex: "maxProperty",
      key: "maxProperty",
    },
    {
      title: "İstifadəçi sayı",
      dataIndex: "maxUser",
      key: "maxUser",
    },
    {
      title: "Qiymət",
      dataIndex: "price",
      key: "price",
    },
  ];

  const onShowSizeChange = (newCurrent: number, newPageSize: number) => {
    if (pageSize !== newPageSize) {
      dispatch(getAllPlanPagingService({ page: 0, pageSize: newPageSize }));
    } else {
      dispatch(
        getAllPlanPagingService({ page: newCurrent - 1, pageSize: newPageSize })
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
          title="Planların Siyahısı"
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
          dataSource={allPlanPaging.items}
          pagination={false}
        />

        <Pagination
          // showQuickJumper
          showSizeChanger
          onChange={onShowSizeChange}
          pageSize={pageSize}
          current={current}
          total={allPlanPaging.count}
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
        <PlanCrudForm form={form} mode={mode} allTenantType={allTenantType} />
      </CrudDrawer>
    </>
  );
};

export default PlanPage;
