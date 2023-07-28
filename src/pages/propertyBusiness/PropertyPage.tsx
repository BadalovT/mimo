import {Button, Card, Col, Form, Pagination, Popconfirm, Popover, Row, Select, Space, Table,} from "antd";
import React, {useContext, useEffect, useState} from "react";
// import { Helmet } from "react-helmet-async";
import FullWidthCard from "../../components/card/FullWidthCard";
import {Plus} from "react-feather";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    EditOutlined, InfoOutlined,
    MoreOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "../../redux/hook";
import CrudDrawer from "../../components/drawer/CrudDrawer";
import {filterStateBusiness, allPropertyItem} from "../../types/property";
import PropertyCrudForm from "./PropertyCrudForm";
import {
    addProperty,
    deleteProperty,
    getAllPropertyPagingService,
    propertyById,
    priceDetail,
    comendantDetail,
    toggleModal,
    updateProperty,
} from "../../redux/store/features/propertyBusinessSlice";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {
    blockService,
    cityService,
    floorService,
    getTenantType,
    metroService,
    roomService,
    stateService,
} from "../../redux/store/features/lookUpSlice";
import PropertyFilter from "./propertyFilter";
import {FilterContext} from "./context/filterContext";
import {fetchAllProject} from "../../redux/store/features/userProjectSlice";
import PropertyPriceForm from "./PropertyPriceForm";
import PropertyComendantForm from "./PropertyCmendantForm";
import PropertyDetailForm from "./PropertyDetailForm";
import {propertyTypeService} from "../../redux/store/features/userPropertyTypeSlice";


const {Option} = Select;
const PropertyBusiness = () => {
    const controller = "MÜLK";
    const [mode, setMode] = useState("new");
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const navigate = useNavigate();

    const location = useLocation();
    const [obj, setObj] = useState<filterStateBusiness | {}>({});
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
            name: {...filter.name, value: searchParams.get("name") || "",},
            area: {...filter.area, value: searchParams.get("area") || "",},
            rentPrice: {...filter.rentPrice, value: searchParams.get("rentPrice") || "",},
            rentStatus: {...filter.rentStatus, value: searchParams.get("rentStatus") || "",},
            propertyTypeId: {...filter.propertyTypeId, value: searchParams.get("propertyTypeId") || "",},
            blockId: {...filter.blockId, value: searchParams.get("blockId") || "",},
            floorId: {...filter.floorId, value: searchParams.get("floorId") || "",},
            roomId: {...filter.roomId, value: searchParams.get("roomId") || "",},
            isRepair: {...filter.isRepair, value: searchParams.get("isRepair") || "",},
            salesStatus: {...filter.salesStatus, value: searchParams.get("salesStatus") || "",},
            salesPrice: {...filter.salesPrice, value: searchParams.get("salesPrice") || "",},
            communalActive: {...filter.communalActive, value: searchParams.get("communalActive") || "",},
            comendantPrice: {...filter.comendantPrice, value: searchParams.get("comendantPrice") || "",},
            projectId: {...filter.projectId, value: searchParams.get("projectId") || "",},
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
            name: {...filter.name, value: "",},
            area: {...filter.area, value: "",},
            rentPrice: {...filter.rentPrice, value: "",},
            rentStatus: {...filter.rentStatus, value: "",},
            propertyTypeId: {...filter.propertyTypeId, value: "",},
            blockId: {...filter.blockId, value: "",},
            floorId: {...filter.floorId, value: "",},
            roomId: {...filter.roomId, value: "",},
            isRepair: {...filter.isRepair, value: "",},
            salesStatus: {...filter.salesStatus, value: "",},
            salesPrice: {...filter.salesPrice, value: "",},
            communalActive: {...filter.communalActive, value: "",},
            comendantPrice: {...filter.comendantPrice, value: "",},
            projectId: {...filter.projectId, value: "",},
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
            filter.name,
            filter.area,
            filter.rentPrice,
            filter.rentStatus,
            filter.propertyTypeId,
            filter.blockId,
            filter.floorId,
            filter.roomId,
            filter.isRepair,
            filter.projectId,
            filter.communalActive,
            filter.comendantPrice,
            filter.salesStatus,
            filter.salesPrice,
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
            } as filterStateBusiness;
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
        (state) => state.propertyBusinessSlice
    );
    const {
        allTenantType,
        allBlock,
        allFloor,
        allRooms,
        // allPropertyType,
        allState,
        allCity,
        allMetro,

    } = useAppSelector((state) => state.lookUpSlice);
    const allProject = useAppSelector((state) => state.userProjectSlice.allProject);
    const allPropertyType = useAppSelector((state) => state.userPropertyTypeSlice.allPropertyType);

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
        dispatch(priceDetail(record.key));
    }
    const propertyDetailId = (record: allPropertyItem) => {
        showDrawer("propertyDetail");
        dispatch(priceDetail(record.key));
    }
    const comendantDetailId = (record: allPropertyItem) => {
        showDrawer("comendantDetail");
        dispatch(comendantDetail(record.key));
    }

    const getMenu = (record: allPropertyItem) => (
        <ul className="dropDown">
            <li
                onClick={() => {
                    propertyDetailId(record);
                }}
            >
                <button className="btn btn-outline-fff text-orange f-s-15">
                    <InfoOutlined style={{marginRight: "10px"}}/> Mülk məlumatları
                </button>
            </li>
            <li
                onClick={() => {
                    priceDetailId(record);
                }}
            >
                <button className="btn btn-outline-fff text-orange f-s-15">
                    <InfoOutlined style={{marginRight: "10px"}}/> Kirayə/Satış məlumatları
                </button>
            </li>
            <li
                onClick={() => {
                    comendantDetailId(record);
                }}
            >
                <button className="btn btn-outline-fff text-orange f-s-15">
                    <InfoOutlined style={{marginRight: "10px"}}/> Komendat məlumatları
                </button>
            </li>
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

    const values = form.getFieldsValue();

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
            dataIndex: "name",
            key: "name",
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
                {mode === "priceDetail" && <PropertyPriceForm form={form} mode={mode}/>}
                {mode === "comendantDetail" && <PropertyComendantForm form={form} mode={mode}/>}
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
                    allProject={allProject}
                    values={values}
                />}
                {mode === "propertyDetail" && <PropertyDetailForm
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
                    allProject={allProject}
                />}
            </CrudDrawer>
        </>
    );
};

export default PropertyBusiness;
