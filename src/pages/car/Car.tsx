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
import React, { useState, useEffect } from "react";
import { Plus } from "react-feather";
import FullWidthCard from "../../components/card/FullWidthCard";

import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  DeleteOutlined,
  EditOutlined,
  KeyOutlined,
  MoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { baseUrl } from "../../utils/url";
import { carType } from "../../types/car";
import CrudDrawer from "../../components/drawer/CrudDrawer";
import CarCrudForm from "./CarCrudForm";
import { fetchAllProject } from "../../redux/store/features/projectSlice";
import {
  addCar,
  deleteCar,
  getAllCar,
  getCarById,
  toggleModal,
  updateCar,
} from "../../redux/store/features/carSlice";
import {showInfo, showSuccess} from "../../utils/showMessage";
const Car = () => {
  const controller = "AVTOMOBIL";
  const [mode, setMode] = useState("new");
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [disabled, setDisabled] = useState(false);
  const [obj, setObj] = useState({});

  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const { allCar, isOpenModal, loading, formValue } = useAppSelector(
    (selector) => selector.carSlice
  );

  const { allProject } = useAppSelector((selector) => selector.projectSlice);

  useEffect(() => {
    dispatch(fetchAllProject());
    dispatch(getAllCar({ page: 0, pageSize: 10, obj: {} }));
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

  const carByKey = (record: carType) => {
    showDrawer("update");
    dispatch(getCarById(record.key));
  };

  const getMenu = (record: carType) => (
    <ul className="dropDown">
      <li
        onClick={() => {
          carByKey(record);
        }}
      >
        <button className="btn btn-outline-fff text-orange f-s-15">
          <EditOutlined style={{ marginRight: "10px" }} /> Yenilə
        </button>
      </li>

      <Popconfirm
        title={`Avtomobil: ${record.carNumber}`}
        description="Silmək istədiyinizdən əminsiniz?"
        okText="Bəli"
        cancelText="Xeyr"
        onConfirm={() => {
          dispatch(deleteCar(record.key)).unwrap().then((res) => {
            if (res) {
                showSuccess("Avtomobil silindi")
              dispatch(getAllCar({ page: 0, pageSize: 10, obj: {} }));
            }else {
              showInfo("Avtomobil silinə bilmədi")
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
    setDisabled(true);

    setTimeout(() => {
      setDisabled(false);
    }, 1100);

    await form.validateFields();

    const values = await form.getFieldsValue();

    if (mode === "new") {
      dispatch(addCar(values)).unwrap().then((res) => {
        if (res) {
            showSuccess("Avtomobil əlavə edildi")
          dispatch(getAllCar({ page: 0, pageSize: 10, obj: {} }));
        }else {
          showInfo("Avtomobil əlavə edilə bilmədi")
        }
      } );
    }
    if (mode === "update") {
      const updateValue = { ...values, key: formValue.key };
      dispatch(updateCar(updateValue)).unwrap().then((res) => {
        if (res) {
            showSuccess("Avtomobil yeniləndi")
          dispatch(getAllCar({ page: 0, pageSize: 10, obj: {} }));
        }else {
          showInfo("Avtomobil yenilənə bilmədi")
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
      render: (record: carType) => {
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
      title: "Avtomobil Nömrəsi",
      dataIndex: "carNumber",
      key: "carNumber",
    },
    {
      title: "Tam Ad",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Telefon",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  const onShowSizeChange = (newCurrent: number, newPageSize: number) => {
    if (pageSize !== newPageSize) {
      dispatch(getAllCar({ page: 0, pageSize: newPageSize, obj: {} }));
    } else {
      dispatch(
        getAllCar({
          page: newCurrent - 1,
          pageSize: newPageSize,
          obj: {},
        })
      );
    }
    setPageSize(newPageSize);
    setCurrent(pageSize !== newPageSize ? 1 : newCurrent);
  };

  return (
    <>
      <FullWidthCard>
        <Card
          title="Avtomobillərin Siyahısı"
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
          dataSource={allCar.items}
          pagination={false}
        />

        <Pagination
          // showQuickJumper
          showSizeChanger
          onChange={onShowSizeChange}
          pageSize={pageSize}
          current={current}
          total={allCar.count}
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
        isOpenModal={isOpenModal}
        loading={loading}
      >
        <CarCrudForm form={form} allProject={allProject} />
      </CrudDrawer>
    </>
  );
};

export default Car;
