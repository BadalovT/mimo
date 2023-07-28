import {Button, Card, Col, Form, Pagination, Popconfirm, Popover, Row, Select, Space, Table,} from "antd";
import React, {useContext, useEffect, useState} from "react";
// import { Helmet } from "react-helmet-async";
import FullWidthCard from "../../components/card/FullWidthCard";
import {Plus} from "react-feather";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "../../redux/hook";
import CrudDrawer from "../../components/drawer/CrudDrawer";
import {filterState, allContractItem} from "../../types/contract";
import ContractCrudForm from "./ContractCrudForm";
import contractBusinessSlice, {
    addContractBusiness, contractBusinessById,
    deleteContractBusiness, getAllContractBusinessPagingService,
    toggleModal,
    updateContractBusiness,
} from "../../redux/store/features/contractBusinessSlice";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {
  blockService,
  cityService,
  floorService,
  getTenantType,
  metroService,
  contractTypeService,
  roomService,
  stateService,
} from "../../redux/store/features/lookUpSlice";
import ContractBusinessFilter from "./ContractFilter";
import {FilterContext} from "./context/filterContext";
import {paymentFilterAction} from "../../types/payment";
import { getAllUserContactAccess } from "../../redux/store/features/userContactAccessSlice";
import { businessContractTypeService } from "../../redux/store/features/lookUpSlice";
import {getUserContractTypeUserAccess} from "../../redux/store/features/userContractTypeSlice";


const {Option} = Select;
const ContractBusiness = () => {
  const controller = "MÜQAVİLƏ";
  const [mode, setMode] = useState("new");
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const navigate = useNavigate();

  const location = useLocation();
  const [obj, setObj] = useState<filterState | {}>({});
  const {filter, setFilter, updateFilterByKey} = useContext(FilterContext)

  const objectToQueryString = (obj:any) => {
    let arr = Object.keys(obj).map(key => obj[key])
    let obj2 = arr.reduce((acc:any, item:any) => {
      if(item.value !== ""){
        acc[item.field] = item.value
      }
      return acc
    }   , {})

    let query = Object.keys(obj2).map(key => key + "=" + obj2[key]).join("&");

    navigate(location.pathname + "?" + query);
    // return query
  };
  const [searchParams] = useSearchParams()

  useEffect(() => {
    filter && setFilter({
      ...filter,
      ContractNo: {...filter?.ContractNo, value: searchParams.get("ContractName") || "",},
        PropertyName: {...filter?.PropertyName, value: searchParams.get("PropertyName") || "",},
        ContractTypeId: {...filter?.ContractTypeId, value: searchParams.get("ContractTypeId") || "",},
        ContractAmount: {...filter?.ContractAmount, value: searchParams.get("ContractAmount") || "",},
        StartDate: {...filter?.StartDate, value: searchParams.get("StartDate") || "",},
        EndDate: {...filter?.EndDate, value: searchParams.get("EndDate") || "",},
        FullName: {...filter?.FullName, value: searchParams.get("FullName") || "",},
        Phone: {...filter?.Phone, value: searchParams.get("Phone") || "",},

    })
    // dispatch(
    //     getAllContractBusinessPagingService({
    //         page: 0,
    //         pageSize: pageSize,
    //         filterState: obj,
    //     })
    // );

  }, []);

  const onRefleshFilter = () => {
    setFilter({
      ...filter,
      ContractNo: {...filter.ContractNo, value: "",},
      PropertyName: {...filter.PropertyName, value: "",},
      ContractTypeId: {...filter.ContractTypeId, value: "",},
      ContractAmount: {...filter.ContractAmount, value: "",},
        StartDate: {...filter.StartDate, value: "",},
        EndDate: {...filter.EndDate, value: "",},
        FullName: {...filter.FullName, value: "",},
        Phone: {...filter.Phone, value: "",},
    })

    navigate(location.pathname);
    dispatch(
        getAllContractBusinessPagingService({
          page: 0,
          pageSize: pageSize,
          filterState: obj,
        })
    );
  };

  const onFilterData = () => {
    const values = [
        filter.ContractNo,
        filter.PropertyName,
        filter.ContractTypeId,
        filter.ContractAmount,
        filter.StartDate,
        filter.EndDate,
        filter.FullName,
        filter.Phone,
    ];
    const noEmptyValues = values.filter((x) => x?.value !== "");
    const noEmptyValues1 = values.filter((x) => x?.value !== "");
    objectToQueryString(values);
    let without0index = noEmptyValues1.shift();
    if (noEmptyValues.length === 1) {
      let objOne = {
        filter: {
          field: noEmptyValues[0]?.field,
          operator: noEmptyValues[0]?.operator,
          value: noEmptyValues[0]?.value,
        },
      } as filterState;
      // console.log(objOne);
      objectToQueryString(values);
      dispatch(
          getAllContractBusinessPagingService({
            page: 0,
            pageSize: pageSize,
            filterState: objOne,
          })
      );
    } else if (noEmptyValues.length === 0) {
      objectToQueryString(values);

      dispatch(
          getAllContractBusinessPagingService({
            page: 0,
            pageSize: pageSize,
            filterState: obj,
          })
      );
    } else {
      let objMoreThanOne = {
        filter: {
          field: noEmptyValues[0]?.field,
          operator: noEmptyValues[0]?.operator,
          value: noEmptyValues[0]?.value,
          logic: "and",
          filters: noEmptyValues1,
        },
      };
      objectToQueryString(values);
      dispatch(
          getAllContractBusinessPagingService({
            page: 0,
            pageSize: pageSize,
            filterState: objMoreThanOne,
          })
      );
    }
    // search.set('projectName', `${projectName.value}`);
    // search.set('salesPrice', `${salesPrice.value}`);
    // setSearch(search, {
    //   replace: true,
    // });
  };

  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  // const { allContractPaging } = useAppSelector((state) => state.contractReducer);
  const {allContractPaging, loading, isOpenModal, formValue} = useAppSelector(
      (state) => state.contractBusinessSlice
  );
  const {
      userContractTypeUserAccess,

  } = useAppSelector((state) => state.userContractTypeSlice);

    const { allUserContactAccess } = useAppSelector(
        (state) => state.userContactAccessSlice
    );

  useEffect(() => {
    // dispatch(getAllContractPagingAction(0, 10));
    dispatch(
        getAllContractBusinessPagingService({page: 0, pageSize: 10, filterState: obj})
    );
    dispatch(getUserContractTypeUserAccess());
    dispatch(getAllUserContactAccess());
  }, []);

  useEffect(() => {
    // if (formValue.tenantTypeId) {
    //     form.setFieldsValue(formValue);
    // } else {
    //     form.resetFields();
    // }
    form.setFieldsValue(formValue);
  }, [formValue]);

  const showDrawer = (mode: string) => {
      console.log(mode, "mode")
    dispatch(toggleModal());
    // setIsModalVisible(true);
    setMode(mode);
  };

  const contractByKey = (record: allContractItem) => {
    showDrawer("update");
    dispatch(contractBusinessById(record.key));
  };

  const getMenu = (record: allContractItem) => (
      <ul className="dropDown">
        <li
            onClick={() => {
              contractByKey(record);
            }}
        >
          <button className="btn btn-outline-fff text-orange f-s-15">
            <EditOutlined style={{marginRight: "10px"}}/> Yenilə
          </button>
        </li>

        <Popconfirm
            title={`Lahiyə: ${record.contractNo}`}
            description="Silmək istədiyinizdən əminsiniz?"
            okText="Bəli"
            cancelText="Xeyr"
            onConfirm={() => {
              dispatch(deleteContractBusiness(record.key)).unwrap().then((result) => {
                    if (result) {
                      dispatch(
                          getAllContractBusinessPagingService({
                            page: 0,
                            pageSize: pageSize,
                            filterState: obj,
                          })
                      );
                    }
                  }
              );
              setMode("delete");
            }}
            // onCancel={cancel}
        >
          <li>
            <button className="btn btn-outline-fff text-red f-s-15">
              <DeleteOutlined style={{marginRight: "10px"}}/> Sil
            </button>
          </li>
        </Popconfirm>
      </ul>
  );

  const handleOk = async () => {
    // setDisabled(true);

    // setTimeout(() => {
    //   setDisabled(false);
    // }, 1100);

    await form.validateFields();

    const values = await form.getFieldsValue();
    console.log(values);
    if (mode === "new") {
      dispatch(addContractBusiness(values)).unwrap().then((result) => {
        if (result) {
          dispatch(
              getAllContractBusinessPagingService({
                page: 0,
                pageSize: pageSize,
                filterState: obj,
              })
          );
        }
      });

      // if (values.tenantTypeId) {
      //   const addContractForm = {
      //     name: values.name,
      //     rentPrice: values.RentPrice,
      //     area: values.Area,
      //     rentStatus: values.rentStatus,
      //     contractTypeId: values.ContractTypeId,
      //     blockId:values.BlockId,
      //     cityId:values.CityId,
      //     stateId:values.StateId,
      //     metroId:values.MetroId,
      //     floorId:values.FloorId,
      //     roomId:values.RoomId,
      //     isRepair:values.isRepair,
      //     address:values.Address,
      //     description: values.description,
      //   };


      // }
    }
    if (mode === "update") {
      // if (values.tenantTypeId) {
      const updateContractBusinessForm = {
        key: formValue.key,
        ...values
      };
      dispatch(updateContractBusiness(updateContractBusinessForm)).unwrap().then((result) => {
            if (result) {
              dispatch(
                  getAllContractBusinessPagingService({
                    page: 0,
                    pageSize: pageSize,
                    filterState: obj,
                  })
              );
            }
          }
      );
      // }
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
            <SettingOutlined className="f-s-15" style={{marginRight: "10px"}}/>
        );
      },
      // fixed: "right",
      width: 100,
      render: (record: allContractItem) => {
        return (
            <>
              <Popover content={getMenu(record)} trigger="click">
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <MoreOutlined/>
                  </Space>
                </a>
              </Popover>
            </>
        );
      },
    },
    {
      title: "Müqavilə №",
      dataIndex: "contractNo",
      key: "contractNo",

      //   render: (text) => <a>{text}</a>,
    },
    // {
    //   title: "Kiraye Meblegi",
    //     dataIndex: "rentPrice",
    //     key: "rentPrice",
    // },
      {
      title: "Məbləğ",
      dataIndex: "contractAmount",
      key: "contractAmount",
    },
      {
      title: "Başlama tarixi",
      dataIndex: "startDate",
      key: "startDate",
    },
      {
      title: "Tam ad",
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
      dispatch(
          getAllContractBusinessPagingService({
            page: 0,
            pageSize: newPageSize,
            filterState: obj,
          })
      );
    } else {
      dispatch(
          getAllContractBusinessPagingService({
            page: newCurrent - 1,
            pageSize: newPageSize,
            filterState: obj,
          })
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
              title="Müqavilə Siyahısı"
              className="flex-md-row flex-column align-md-items-center align-items-start border-bottom"
          >
            <ContractBusinessFilter
                onFilterData={onFilterData}
                onRefleshFilter={onRefleshFilter}
            />
            <Row className="mx-0" style={{marginTop: '20px'}}>
              <Col sm={12} md={18}>
                <div className=" mt-md-0 mt-0">
                  <Button
                      onClick={() => showDrawer("new")}
                      className="ms-2"
                      color="primary"
                  >
                    <Plus className="align-middle" size={15}/>
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
                    ? {x: 1300, y: window.innerHeight - 420}
                    : {x: 1300, y: 350}
              }
              columns={column}
              dataSource={allContractPaging.items}
              pagination={false}
          />

          <Pagination
              // showQuickJumper
              showSizeChanger
              onChange={onShowSizeChange}
              pageSize={pageSize}
              current={current}
              total={allContractPaging.count}
              locale={{items_per_page: "/ səhifə"}}
              style={{padding: "12px"}}
          />
        </FullWidthCard>

        <CrudDrawer
            width={500}
            mode={mode}
            // isModalVisible={isModalVisible}
            isOpenModal={isOpenModal}
            handleCancel={handleCancel}
            handleOk={handleOk}
            controller={controller}
            loading={loading}
        >
            <ContractCrudForm
                form={form}
                mode={mode}
                allContractType={userContractTypeUserAccess}
                allUserContactAccess={allUserContactAccess}
            />
        </CrudDrawer>
      </>
  );
};

export default ContractBusiness;
