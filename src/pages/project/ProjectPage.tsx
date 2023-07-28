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

import { showInfo, showSuccess } from "../../utils/showMessage";
import jwt_decode from "jwt-decode";
import { getAccessToken } from "../../utils/token/getAccessClaims";
import { getAllProjectItem } from "../../types/project";

import ProjectCrudForm from "./ProjectCrudForm";
import {
  addProject,
  deleteProject,
  getAllProjectPaging,
  getProjectById,
  toggleModal,
  updateProject,
} from "../../redux/store/features/projectSlice";

const ProjectPage = () => {
  const controller = "LAYİHƏ";
  const [mode, setMode] = useState("new");
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const { allProjectPaging, loading, isOpenModal, formValue } = useAppSelector(
    (state) => state.projectSlice
  );

  useEffect(() => {
    dispatch(getAllProjectPaging({ page: 0, pageSize: 10 }));
    // dispatch(userOperationClaimAction(1));
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

  const projectByKey = (record: getAllProjectItem) => {
    showDrawer("update");
    dispatch(getProjectById(record.key));
  };

  const getMenu = (record: getAllProjectItem) => (
    <ul className="dropDown">
      <li
        onClick={() => {
          projectByKey(record);
        }}
      >
        <button className="btn btn-outline-fff text-orange f-s-15">
          <EditOutlined style={{ marginRight: "10px" }} /> Yenilə
        </button>
      </li>

      <Popconfirm
        title={`Layihə: ${record.name}`}
        description="Silmək istədiyinizdən əminsiniz?"
        okText="Bəli"
        cancelText="Xeyr"
        onConfirm={() => {
          dispatch(deleteProject(record.key)).unwrap().then((res) => {
            if (res) {
                showSuccess("Layihə silindi");
                dispatch(getAllProjectPaging({ page: 0, pageSize: 10 }));
            } else {
                showInfo("Layihə silinə bilmədi");
            }
          setMode("delete");
          }); }}
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
      const addProjectForm = values;
      dispatch(addProject(addProjectForm)).unwrap().then((res) => {
        if (res) {
          showSuccess("Layihə əlavə edildi");
          dispatch(getAllProjectPaging({ page: 0, pageSize: 10 }));
        } else {
          showInfo("Layihə əlavə edilə bilmədi");
        }
      } );
    }
    if (mode === "update") {
      const updateProjectForm = {
        key: formValue.key,
        name: values.name,
        adress: values.adress,
      };
      dispatch(updateProject(updateProjectForm)).unwrap().then((res) => {
        if (res) {
          showSuccess("Layihə yeniləndi");
          dispatch(getAllProjectPaging({ page: 0, pageSize: 10 }));
        } else {
          showInfo("Layihə yenilənə bilmədi");
        }
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
      render: (record: getAllProjectItem) => {
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
      title: "Adres",
      dataIndex: "adress",
      key: "adress",
    },
  ];

  const onShowSizeChange = (newCurrent: number, newPageSize: number) => {
    if (pageSize !== newPageSize) {
      dispatch(getAllProjectPaging({ page: 0, pageSize: newPageSize }));
    } else {
      dispatch(
        getAllProjectPaging({ page: newCurrent - 1, pageSize: newPageSize })
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
          title="Layihələrin Siyahısı"
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
          dataSource={allProjectPaging.items}
          pagination={false}
        />

        <Pagination
          // showQuickJumper
          showSizeChanger
          onChange={onShowSizeChange}
          pageSize={pageSize}
          current={current}
          total={allProjectPaging.count}
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
        <ProjectCrudForm form={form} mode={mode} />
      </CrudDrawer>
    </>
  );
};

export default ProjectPage;
