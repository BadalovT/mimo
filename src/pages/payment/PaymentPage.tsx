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
import {filterState, allPaymentItem} from "../../types/payment";
import PaymentCrudForm from "./PaymentCrudForm";
import {
    addPayment,
    deletePayment,
    getAllPaymentPagingService,
    paymentById,
    toggleModal,
    updatePayment,
} from "../../redux/store/features/paymentSlice";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {
    blockService,
    cityService,
    floorService,
    getTenantType,
    metroService, monthService,
    paymentTypeService,
    roomService,
    stateService,
} from "../../redux/store/features/lookUpSlice";
import PaymentFilter from "./PaymentFilter";
import {FilterContext} from "./context/filterContext";
import {allContractItem} from "../../types/contract";


const {Option} = Select;
const Payment = () => {
    const controller = "ÖDƏNİŞ";
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
        console.log(query)
        navigate(location.pathname + "?" + query);
        // return query
    };
    const [searchParams] = useSearchParams()

    useEffect(() => {
        filter && setFilter({
            ...filter,
            ContractName: {...filter?.ContractNo, value: searchParams.get("ContractName") || "",},
            PaymentAmount: {...filter?.PaymentAmount, value: searchParams.get("PaymentAmount") || "",},
            PaymentDate: {...filter?.PaymentDate, value: searchParams.get("PaymentDate") || "",},
            PaymentTypeName: {...filter?.PaymentTypeName, value: searchParams.get("PaymentTypeName") || "",},
            Year: {...filter?.Year, value: searchParams.get("Year") || "",},
        })
        // dispatch(
        //     getAllPaymentPagingService({
        //         page: 0,
        //         pageSize: pageSize,
        //         filterState: obj,
        //     })
        // );

    }, []);


    const onRefleshFilter = () => {

        setFilter({
            ...filter,
            ContractName: {...filter.ContractNo, value: "",},
            PaymentAmount: {...filter.PaymentAmount, value: "",},
            PaymentDate: {...filter.PaymentDate, value: "",},
            PaymentTypeName: {...filter.PaymentTypeName, value: "",},
            Year: {...filter.Year, value: "",},          
        })

        navigate(location.pathname);
        dispatch(
            getAllPaymentPagingService({
                page: 0,
                pageSize: pageSize,
                filterState: obj,
            })
        );
    };

    const onFilterData = () => {
        const values = [
            filter.ContractNo,
            filter.PaymentAmount,
            filter.PaymentDate,
            filter.PaymentTypeName,
            filter.Year,
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
                getAllPaymentPagingService({
                    page: 0,
                    pageSize: pageSize,
                    filterState: objOne,
                })
            );
        } else if (noEmptyValues.length === 0) {
            objectToQueryString(values);

            dispatch(
                getAllPaymentPagingService({
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
                getAllPaymentPagingService({
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

    // const { allPaymentPaging } = useAppSelector((state) => state.paymentReducer);
    const {allPaymentPaging, loading, isOpenModal, formValue} = useAppSelector(
        (state) => state.paymentSlice
    );
    const {
        allTenantType,
        allBlock,
        allFloor,
        allRooms,
        allProject,
        allPaymentType,
        allState,
        allCity,
        allMetro,
        allMonth,
    } = useAppSelector((state) => state.lookUpSlice);

    const {allContract} = useAppSelector((state) => state.contractSlice);

    useEffect(() => {
        // dispatch(getAllPaymentPagingAction(0, 10));
        dispatch(
            getAllPaymentPagingService({page: 0, pageSize: 10, filterState: obj})
        );
        dispatch(getTenantType());

        dispatch(paymentTypeService());
        dispatch(monthService());
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
        dispatch(toggleModal());
        // setIsModalVisible(true);
        setMode(mode);
    };

    const paymentByKey = (record: allPaymentItem) => {
        showDrawer("update");
        dispatch(paymentById(record.key));
    };

    const getMenu = (record: allPaymentItem) => (
        <ul className="dropDown">
            <li
                onClick={() => {
                    paymentByKey(record);
                }}
            >
                <button className="btn btn-outline-fff text-orange f-s-15">
                    <EditOutlined style={{marginRight: "10px"}}/> Yenilə
                </button>
            </li>

            <Popconfirm
                title={`Lahiyə: ${record.ContractName}`}
                description="Silmək istədiyinizdən əminsiniz?"
                okText="Bəli"
                cancelText="Xeyr"
                onConfirm={() => {
                    dispatch(deletePayment(record.key)).unwrap().then((result) => {
                            if (result) {
                                dispatch(
                                    getAllPaymentPagingService({
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
            dispatch(addPayment(values)).unwrap().then((result) => {
                if (result) {
                    dispatch(
                        getAllPaymentPagingService({
                            page: 0,
                            pageSize: pageSize,
                            filterState: obj,
                        })
                    );
                }
            });

            // if (values.tenantTypeId) {
            //   const addPaymentForm = {
            //     name: values.name,
            //     rentPrice: values.RentPrice,
            //     area: values.Area,
            //     rentStatus: values.rentStatus,
            //     paymentTypeId: values.PaymentTypeId,
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
            const updatePaymentForm = {
                key: formValue.key,
                ...values
            };
            dispatch(updatePayment(updatePaymentForm)).unwrap().then((result) => {
                    if (result) {
                        dispatch(
                            getAllPaymentPagingService({
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
            render: (record: allPaymentItem) => {
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
            dataIndex: "contractName",
            key: "contractName",
        },
        {
          title: "Ödəniş məbləği",
            dataIndex: "paymentAmount",
            key: "paymentAmount",
        },
        {
            title: "Ödəniş tarixi",
            dataIndex: "paymentDate",
            key: "paymentDate",
        },
        {
            title: "Ödəniş növü",
            dataIndex: "paymentTypeName",
            key: "paymentTypeName",
        },
        {
            title: "Ödəniş növü",
            dataIndex: "year",
            key: "year",
        },
    ];

    const onShowSizeChange = (newCurrent: number, newPageSize: number) => {
        if (pageSize !== newPageSize) {
            dispatch(
                getAllPaymentPagingService({
                    page: 0,
                    pageSize: newPageSize,
                    filterState: obj,
                })
            );
        } else {
            dispatch(
                getAllPaymentPagingService({
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
                    title="Ödənişlərin Siyahısı"
                    className="flex-md-row flex-column align-md-items-center align-items-start border-bottom"
                >
                    <PaymentFilter
                        onFilterData={onFilterData}
                        onRefleshFilter={onRefleshFilter}
                        // name={name}
                        // setName={setName}
                        // rentPrice={rentPrice}
                        // setRentPrice={setRentPrice}
                        // area={area}
                        // setArea={setArea}
                        // rentStatus={rentStatus}
                        // setRentStatus={setRentStatus}
                        // paymentTypeName={paymentTypeName}
                        // setPaymentTypeName={setPaymentTypeName}
                        // blockName={blockName}
                        // setBlockName={setBlockName}
                        // cityName={cityName}
                        // setCityName={setCityName}
                        // stateName={stateName}
                        // metroName={metroName}
                        // floorName={floorName}
                        // roomName={roomName}
                        // isRepair={isRepair}
                        // setIsRepair={setIsRepair}
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
                    dataSource={allPaymentPaging.items}
                    pagination={false}
                />

                <Pagination
                    // showQuickJumper
                    showSizeChanger
                    onChange={onShowSizeChange}
                    pageSize={pageSize}
                    current={current}
                    total={allPaymentPaging.count}
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
                <PaymentCrudForm
                    form={form}
                    mode={mode}
                    allTenantType={allTenantType}
                    allPaymentType={allPaymentType}
                    allMonth={allMonth}
                    allContract={allContract}
                />
            </CrudDrawer>
        </>
    );
};

export default Payment;
