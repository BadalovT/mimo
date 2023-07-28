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
import {filterStateRieltor, allPropertyItem, propertyFilterAction} from "../../types/property";
import PropertyCrudForm from "./PropertyCrudForm";
import {
    addProperty,
    deleteProperty,
    getAllPropertyPagingService,
    propertyById,
    toggleModal,
    updateProperty,
} from "../../redux/store/features/propertyRieltorSlice";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {
    blockService,
    cityService, contractTypeService,
    floorService,
    getTenantType,
    metroService,
    propertyTypeService,
    roomService,
    stateService,
} from "../../redux/store/features/lookUpSlice";
import PropertyFilter from "./propertyFilter";
import {FilterContext} from "./context/filterContext";
import {fetchAllProject} from "../../redux/store/features/projectSlice";
import PropertyPriceForm from "./PropertyPriceForm";


const {Option} = Select;
const PropertyRieltor = () => {
    const controller = "MÜLK";
    const [mode, setMode] = useState("new");
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const navigate = useNavigate();

    const location = useLocation();
    const [obj, setObj] = useState<filterStateRieltor | {}>({});
    const {filter, setFilter, updateFilterByKey} = useContext(FilterContext)

    const objectToQueryString = (obj: any) => {
        let arr = Object.keys(obj).map(key => obj[key])
        let obj2 = arr.reduce((acc: any, item: any) => {
            if (item.value !== "") {
                acc[item.field] = item.value
            }
            return acc
        }, {})

        let query = Object.keys(obj2).map(key => key + "=" + obj2[key]).join("&");
        console.log(query)
        navigate(location.pathname + "?" + query);
        // return query
    };
    const [searchParams] = useSearchParams()

    useEffect(() => {
        setFilter({
            ...filter,
            propertyName: {...filter.propertyName, value: searchParams.get("propertyName") || "",},
            propertyUserName: {...filter.propertyUserName, value: searchParams.get("propertyUserName") || "",},
            propertyPhone: {...filter.propertyPhone, value: searchParams.get("propertyPhone") || "",},
            propertyAmount: {...filter.propertyAmount, value: searchParams.get("propertyAmount") || "",},
            contractTypeId: {...filter.contractTypeId, value: searchParams.get("contractTypeId") || "",},
            propertyStatus: {...filter.propertyStatus, value: searchParams.get("propertyStatus") || "",},
            area: {...filter.area, value: searchParams.get("area") || "",},
            propertyTypeId: {...filter.propertyTypeId, value: searchParams.get("propertyTypeId") || "",},
            blockId: {...filter.blockId, value: searchParams.get("blockId") || "",},
            cityId: {...filter.cityId, value: searchParams.get("cityId") || "",},
            stateId: {...filter.stateId, value: searchParams.get("stateId") || "",},
            metroId: {...filter.metroId, value: searchParams.get("metroId") || "",},
            floorId: {...filter.floorId, value: searchParams.get("floorId") || "",},
            roomId: {...filter.roomId, value: searchParams.get("roomId") || "",},
            isRepair: {...filter.isRepair, value: searchParams.get("isRepair") || "",},
        })
        // dispatch(
        //     getAllPropertyPagingService({
        //         page: 0,
        //         pageSize: pageSize,
        //         filterState: obj,
        //     })
        // );

    }, []);


    const onRefleshFilter = () => {

        setFilter({
            ...filter,
            propertyName: {...filter.propertyName, value: "",},
            propertyUserName: {...filter.propertyUserName, value: "",},
            propertyPhone: {...filter.propertyPhone, value: "",},
            propertyAmount: {...filter.propertyAmount, value: "",},
            contractTypeId: {...filter.contractTypeId, value: "",},
            propertyStatus: {...filter.propertyStatus, value: "",},
            area: {...filter.area, value: "",},
            propertyTypeId: {...filter.propertyTypeId, value: "",},
            blockId: {...filter.blockId, value: "",},
            cityId: {...filter.cityId, value: "",},
            stateId: {...filter.stateId, value: "",},
            metroId: {...filter.metroId, value: "",},
            floorId: {...filter.floorId, value: "",},
            roomId: {...filter.roomId, value: "",},
            isRepair: {...filter.isRepair, value: "",},
        })

        navigate(location.pathname);
        dispatch(
            getAllPropertyPagingService({
                page: 0,
                pageSize: pageSize,
                filterState: obj,
            })
        );
    };


    const onFilterData = () => {
        const values = [
            filter.propertyName,
            filter.propertyUserName,
            filter.propertyPhone,
            filter.propertyAmount,
            filter.propertyTypeId,
            filter.blockId,
            filter.floorId,
            filter.roomId,
            filter.cityId,
            filter.stateId,
            filter.metroId,
            filter.area,
            filter.isRepair,
            filter.contractTypeId,
            filter.propertyStatus,
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
            } as filterStateRieltor;
            // console.log(objOne);
            objectToQueryString(values);
            dispatch(
                getAllPropertyPagingService({
                    page: 0,
                    pageSize: pageSize,
                    filterState: objOne,
                })
            );
        } else if (noEmptyValues.length === 0) {
            objectToQueryString(values);

            dispatch(
                getAllPropertyPagingService({
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
                getAllPropertyPagingService({
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

    // const { allPropertyPaging } = useAppSelector((state) => state.propertyReducer);
    const {allPropertyPaging, loading, isOpenModal, formValue} = useAppSelector(
        (state) => state.propertyRieltorSlice
    );
    const {
        allTenantType,
        allBlock,
        allFloor,
        allRooms,
        allPropertyType,
        allState,
        allCity,
        allMetro,
        allContractType
    } = useAppSelector((state) => state.lookUpSlice);
    const allProject = useAppSelector((state) => state.projectSlice.allProject);

    useEffect(() => {
        // dispatch(getAllPropertyPagingAction(0, 10));
        dispatch(
            getAllPropertyPagingService({page: 0, pageSize: 10, filterState: obj})
        );
        dispatch(getTenantType());
        dispatch(blockService());
        dispatch(floorService());
        dispatch(roomService());
        dispatch(propertyTypeService());
        dispatch(cityService());
        dispatch(stateService());
        dispatch(metroService());
        dispatch(fetchAllProject());
        dispatch(contractTypeService());
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

    const propertyByKey = (record: allPropertyItem) => {
        showDrawer("update");
        dispatch(propertyById(record.key));
    };

    const priceDetailId = (record: allPropertyItem) => {
        showDrawer("priceDetail");
    }
    const comendantDetailId = (record: allPropertyItem) => {
        showDrawer("comendantDetail");
    }

    const getMenu = (record: allPropertyItem) => (
        <ul className="dropDown">
            <li
                onClick={() => {
                    propertyByKey(record);
                }}
            >
                <button className="btn btn-outline-fff text-orange f-s-15">
                    <EditOutlined style={{marginRight: "10px"}}/> Yenilə
                </button>
            </li>

            <Popconfirm
                title={`Lahiyə: ${record.name}`}
                description="Silmək istədiyinizdən əminsiniz?"
                okText="Bəli"
                cancelText="Xeyr"
                onConfirm={() => {
                    dispatch(deleteProperty(record.key)).unwrap().then((result) => {
                            if (result) {
                                dispatch(
                                    getAllPropertyPagingService({
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

        await form.validateFields();

        const values = await form.getFieldsValue();
        console.log(values);
        if (mode === "new") {
            dispatch(addProperty(values)).unwrap().then((result) => {
                if (result) {
                    dispatch(
                        getAllPropertyPagingService({
                            page: 0,
                            pageSize: pageSize,
                            filterState: obj,
                        })
                    );
                }
            });
        }
        if (mode === "update") {
            const updatePropertyForm = {
                key: formValue.key,
                ...values
            };
            dispatch(updateProperty(updatePropertyForm)).unwrap().then((result) => {
                    if (result) {
                        dispatch(
                            getAllPropertyPagingService({
                                page: 0,
                                pageSize: pageSize,
                                filterState: obj,
                            })
                        );
                    }
                }
            );
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
            width: 100,
            render: (record: allPropertyItem) => {
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
            title: "Ad",
            dataIndex: "propertyName",
            key: "propertyName",
        },
        {
            title: "Sahə",
            dataIndex: "area",
            key: "area",
        },
        {
            title: "Təmir",
            dataIndex: "isRepair",
            key: "isRepair",
            render: (isRepair: boolean) => (
                <>
                    {isRepair ? (
                        <CheckCircleOutlined style={{color: "green"}}/>
                    ) : (
                        <CloseCircleOutlined style={{color: "red"}}/>
                    )}
                </>
            ),
        },
    ];

    const onShowSizeChange = (newCurrent: number, newPageSize: number) => {
        if (pageSize !== newPageSize) {
            dispatch(
                getAllPropertyPagingService({
                    page: 0,
                    pageSize: newPageSize,
                    filterState: obj,
                })
            );
        } else {
            dispatch(
                getAllPropertyPagingService({
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
                    title="Mülklərin Siyahısı"
                    className="flex-md-row flex-column align-md-items-center align-items-start border-bottom"
                >
                    <PropertyFilter
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
                    dataSource={allPropertyPaging.items}
                    pagination={false}
                />

                <Pagination
                    // showQuickJumper
                    showSizeChanger
                    onChange={onShowSizeChange}
                    pageSize={pageSize}
                    current={current}
                    total={allPropertyPaging.count}
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
                {(mode === "new" || mode === "update") && <PropertyCrudForm
                    form={form}
                    mode={mode}
                    allTenantType={allTenantType}
                    allPropertyType={allPropertyType}
                    allBlock={allBlock}
                    allCity={allCity}
                    allState={allState}
                    allMetro={allMetro}
                    allFloor={allFloor}
                    allRoom={allRooms}
                    allContractType={allContractType}
                />}
            </CrudDrawer>
        </>
    );
};

export default PropertyRieltor;
