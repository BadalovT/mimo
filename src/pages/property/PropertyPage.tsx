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
import {filterState, allPropertyItem} from "../../types/property";
import PropertyCrudForm from "./PropertyCrudForm";
import {
    addProperty,
    deleteProperty,
    getAllPropertyPagingService,
    propertyById,
    toggleModal,
    updateProperty,
} from "../../redux/store/features/propertySlice";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {
    blockService,
    cityService,
    floorService,
    getTenantType,
    metroService,
    propertyTypeService,
    roomService,
    stateService,
} from "../../redux/store/features/lookUpSlice";
import PropertyFilter from "./propertyFilter";
import {FilterContext} from "./context/filterContext";


const {Option} = Select;
const Property = () => {
    const controller = "MÜLK";
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
            stateId: {...filter.stateId, value: searchParams.get("stateId") || "",},
            cityId: {...filter.cityId, value: searchParams.get("cityId") || "",},
            metroId: {...filter.metroId, value: searchParams.get("metroId") || "",},
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
            name: {...filter.name, value: "",},
            area: {...filter.area, value: "",},
            rentPrice: {...filter.rentPrice, value: "",},
            rentStatus: {...filter.rentStatus, value: "",},
            propertyTypeId: {...filter.propertyTypeId, value: "",},
            blockId: {...filter.blockId, value: "",},
            floorId: {...filter.floorId, value: "",},
            roomId: {...filter.roomId, value: "",},
            stateId: {...filter.stateId, value: "",},
            cityId: {...filter.cityId, value: "",},
            metroId: {...filter.metroId, value: "",},
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
            filter.name,
            filter.area,
            filter.rentPrice,
            filter.rentStatus,
            filter.propertyTypeId,
            filter.blockId,
            filter.floorId,
            filter.roomId,
            filter.stateId,
            filter.cityId,
            filter.metroId,
            filter.isRepair
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
        (state) => state.propertySlice
    );
    const {
        allTenantType,
        allBlock,
        allFloor,
        allRooms,
        allProject,
        allPropertyType,
        allState,
        allCity,
        allMetro,

    } = useAppSelector((state) => state.lookUpSlice);

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
        // setDisabled(true);

        // setTimeout(() => {
        //   setDisabled(false);
        // }, 1100);

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

            // if (values.tenantTypeId) {
            //   const addPropertyForm = {
            //     name: values.name,
            //     rentPrice: values.RentPrice,
            //     area: values.Area,
            //     rentStatus: values.rentStatus,
            //     propertyTypeId: values.PropertyTypeId,
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

            //   render: (text) => <a>{text}</a>,
        },
        // {
        //   title: "Kiraye Meblegi",
        //     dataIndex: "rentPrice",
        //     key: "rentPrice",
        // },
        {
            title: "Sahə",
            dataIndex: "area",
            key: "area",
        },
        // {
        //     title: "Kirayə Statusu",
        //     dataIndex: "rentStatus",
        //     key: "rentStatus",
        // },
        // {
        //     title: "Əmlak Növü",
        //     dataIndex: "PropertyTypeName",
        //     key: "PropertyTypeName",
        // } ,
        // {
        //     title: "Blok",
        //     dataIndex: "BlockName",
        //     key: "BlockName",
        // } ,
        // {
        //   title: "Şəhər",
        //     dataIndex: "CityName",
        //     key: "CityName",
        // } ,
        // {
        //   title: "Rayon",
        //     dataIndex: "StateName",
        //     key: "StateName",
        // } ,
        // {
        //     title: "Metro",
        //     dataIndex: "MetroName",
        //     key: "MetroName",
        // } ,
        // {
        //     title: "Mərtəbə",
        //     dataIndex: "FloorName",
        //     key: "FloorName",
        // } ,
        // {
        //   title: "Otaq",
        //     dataIndex: "RoomName",
        //     key: "RoomName",
        // } ,
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
        // {
        //     title: "Ünvan",
        //     dataIndex: "Address",
        //     key: "Address",
        // } ,
        // {
        //     title: "Təsvir",
        //     dataIndex: "description",
        //     key: "description",
        // }

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
                        // name={name}
                        // setName={setName}
                        // rentPrice={rentPrice}
                        // setRentPrice={setRentPrice}
                        // area={area}
                        // setArea={setArea}
                        // rentStatus={rentStatus}
                        // setRentStatus={setRentStatus}
                        // propertyTypeName={propertyTypeName}
                        // setPropertyTypeName={setPropertyTypeName}
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
                    {/*<Row gutter={16}>*/}
                    {/*    <Col xs={12} md={6}>*/}
                    {/*        <div>*/}
                    {/*            <label className="m-r-1">Mülk adı</label>*/}
                    {/*            <Input*/}
                    {/*                className=" form-control-sm form-control mb-50"*/}
                    {/*                autoComplete="off"*/}
                    {/*                placeholder="name"*/}
                    {/*                value={name?.value}*/}
                    {/*                onChange={(e) =>*/}
                    {/*                    setName({*/}
                    {/*                        ...name,*/}
                    {/*                        value: e.target.value,*/}
                    {/*                        field: "name",*/}
                    {/*                        operator: "contains",*/}
                    {/*                    })*/}
                    {/*                }*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*    </Col>*/}
                    {/*    <Col xs={12} md={6}>*/}
                    {/*        <div>*/}
                    {/*            <label className="m-r-1">Satış qiyməti</label>*/}
                    {/*            <InputNumber*/}
                    {/*                style={{width: "100%"}}*/}
                    {/*                className=" form-control-sm form-control mb-50"*/}
                    {/*                autoComplete="off"*/}
                    {/*                type="number"*/}
                    {/*                placeholder="sales price"*/}
                    {/*                value={salesPrice?.value}*/}
                    {/*                onChange={(e) => {*/}
                    {/*                    if (typeof e === "number") {*/}
                    {/*                        setSalesPrice({*/}
                    {/*                            ...salesPrice,*/}
                    {/*                            value: String(e),*/}
                    {/*                            field: "salesPrice",*/}
                    {/*                            operator: "eq",*/}
                    {/*                        });*/}
                    {/*                    }*/}
                    {/*                }}*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*    </Col>*/}
                    {/*    <Col xs={12} md={6}>*/}
                    {/*        <div>*/}
                    {/*            <label className="m-r-1">İcarə qiyməti</label>*/}
                    {/*            <InputNumber*/}
                    {/*                style={{width: "100%"}}*/}
                    {/*                className=" form-control-sm form-control mb-50"*/}
                    {/*                autoComplete="off"*/}
                    {/*                type="number"*/}
                    {/*                placeholder="rent price"*/}
                    {/*                value={rentPrice?.value}*/}
                    {/*                onChange={(e) => {*/}
                    {/*                    if (typeof e === "number") {*/}
                    {/*                        setRentPrice({*/}
                    {/*                            ...rentPrice,*/}
                    {/*                            value: String(e),*/}
                    {/*                            field: "rentPrice",*/}
                    {/*                            operator: "eq",*/}
                    {/*                        });*/}
                    {/*                    }*/}
                    {/*                }}*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*    </Col>*/}

                    {/*    <Col xs={12} md={6}>*/}
                    {/*        <div>*/}
                    {/*            <label className="m-r-1">Blok</label>*/}
                    {/*            <Select*/}
                    {/*                style={{*/}
                    {/*                    width: "100%",*/}
                    {/*                }}*/}
                    {/*                showSearch*/}
                    {/*                placeholder="Select a block"*/}
                    {/*                optionFilterProp="children"*/}
                    {/*                value={block?.value}*/}
                    {/*                onChange={(e) =>*/}
                    {/*                    setBlock({*/}
                    {/*                        ...block,*/}
                    {/*                        value: `${e}`,*/}
                    {/*                        field: "BlockId",*/}
                    {/*                        operator: "eq",*/}
                    {/*                    })*/}
                    {/*                }*/}
                    {/*                filterOption={(input: string, option: any) =>*/}
                    {/*                    option?.children*/}
                    {/*                        ?.toLowerCase()*/}
                    {/*                        .includes(input.toLowerCase())*/}
                    {/*                }*/}
                    {/*            >*/}
                    {/*                {" "}*/}
                    {/*                <Option value="">hamısı</Option>*/}
                    {/*                {allBlock?.map((opt: BlockRes) => (*/}
                    {/*                    <Option key={opt.key} value={opt.key}>*/}
                    {/*                        {opt.name}*/}
                    {/*                    </Option>*/}
                    {/*                ))}*/}
                    {/*            </Select>*/}
                    {/*        </div>*/}
                    {/*    </Col>*/}
                    {/*    <Col xs={12} md={6}>*/}
                    {/*        <div>*/}
                    {/*            <label className="m-r-1">Mərtəbə</label>*/}
                    {/*            <Select*/}
                    {/*                style={{*/}
                    {/*                    width: "100%",*/}
                    {/*                }}*/}
                    {/*                showSearch*/}
                    {/*                placeholder="Select a floor"*/}
                    {/*                optionFilterProp="children"*/}
                    {/*                value={floor?.value}*/}
                    {/*                onChange={(e) =>*/}
                    {/*                    setFloor({*/}
                    {/*                        ...floor,*/}
                    {/*                        value: e,*/}
                    {/*                        field: "floor",*/}
                    {/*                        operator: "eq",*/}
                    {/*                    })*/}
                    {/*                }*/}
                    {/*                filterOption={(input: string, option: any) =>*/}
                    {/*                    option?.children*/}
                    {/*                        ?.toLowerCase()*/}
                    {/*                        .includes(input.toLowerCase())*/}
                    {/*                }*/}
                    {/*            >*/}
                    {/*                {" "}*/}
                    {/*                <Option value="">hamısı</Option>*/}
                    {/*                {allFloor &&*/}
                    {/*                allFloor.map((opt: FloorRes) => (*/}
                    {/*                    <Option key={opt.key} value={opt.key}>*/}
                    {/*                        {opt.name}*/}
                    {/*                    </Option>*/}
                    {/*                ))}*/}
                    {/*            </Select>*/}
                    {/*        </div>*/}
                    {/*    </Col>*/}
                    {/*    <Col xs={12} md={6}>*/}
                    {/*        <div>*/}
                    {/*            <label className="m-r-1">Otaq</label>*/}
                    {/*            <Select*/}
                    {/*                style={{*/}
                    {/*                    width: "100%",*/}
                    {/*                }}*/}
                    {/*                showSearch*/}
                    {/*                placeholder="projectName"*/}
                    {/*                optionFilterProp="children"*/}
                    {/*                value={room?.value}*/}
                    {/*                onChange={(e, select) =>*/}
                    {/*                    setRoom({*/}
                    {/*                        ...room,*/}
                    {/*                        value: e,*/}
                    {/*                        field: "room",*/}
                    {/*                        operator: "contains",*/}
                    {/*                    })*/}
                    {/*                }*/}
                    {/*                filterOption={(input: string, option: any) =>*/}
                    {/*                    option.children.toLowerCase().includes(input.toLowerCase())*/}
                    {/*                }*/}
                    {/*            >*/}
                    {/*                <Option value="">hamısı</Option>*/}
                    {/*                {allRooms?.map((opt) => (*/}
                    {/*                    <Option key={opt.key} value={opt.key}>*/}
                    {/*                        {opt.name}*/}
                    {/*                    </Option>*/}
                    {/*                ))}*/}
                    {/*            </Select>*/}
                    {/*        </div>*/}
                    {/*    </Col>*/}
                    {/*    <Col xs={24} md={6}>*/}
                    {/*        {" "}*/}
                    {/*        <div>*/}
                    {/*            <label className="m-r-1">Proyekt</label>*/}
                    {/*            <Select*/}
                    {/*                style={{*/}
                    {/*                    width: "100%",*/}
                    {/*                }}*/}
                    {/*                showSearch*/}
                    {/*                placeholder="projectName"*/}
                    {/*                optionFilterProp="children"*/}
                    {/*                value={projectName?.value}*/}
                    {/*                onChange={(e, select) =>*/}
                    {/*                    setProjectName({*/}
                    {/*                        ...projectName,*/}
                    {/*                        value: select.children,*/}
                    {/*                        field: "projectName",*/}
                    {/*                        operator: "contains",*/}
                    {/*                    })*/}
                    {/*                }*/}
                    {/*                filterOption={(input: string, option: any) =>*/}
                    {/*                    option.children.toLowerCase().includes(input.toLowerCase())*/}
                    {/*                }*/}
                    {/*            >*/}
                    {/*                <Option value="">hamısı</Option>*/}
                    {/*                {allProject?.map((opt) => (*/}
                    {/*                    <Option key={opt.key} value={opt.key}>*/}
                    {/*                        {opt.name}*/}
                    {/*                    </Option>*/}
                    {/*                ))}*/}
                    {/*            </Select>*/}
                    {/*        </div>*/}
                    {/*    </Col>*/}
                    {/*    <Col xs={12} md={6}>*/}
                    {/*        <div>*/}
                    {/*            <label className="m-r-1">Mülk növü</label>*/}
                    {/*            <Select*/}
                    {/*                style={{*/}
                    {/*                    width: "100%",*/}
                    {/*                }}*/}
                    {/*                showSearch*/}
                    {/*                placeholder="Select a person"*/}
                    {/*                optionFilterProp="children"*/}
                    {/*                value={propertyTypeName?.value}*/}
                    {/*                onChange={(e, select) =>*/}
                    {/*                    setPropertyTypeName({*/}
                    {/*                        ...propertyTypeName,*/}
                    {/*                        value: select.children,*/}
                    {/*                        field: "propertyTypeName",*/}
                    {/*                        operator: "contains",*/}
                    {/*                    })*/}
                    {/*                }*/}
                    {/*                filterOption={(input: string, option: any) =>*/}
                    {/*                    option?.children*/}
                    {/*                        ?.toLowerCase()*/}
                    {/*                        .includes(input.toLowerCase())*/}
                    {/*                }*/}
                    {/*            >*/}
                    {/*                <Option value="">hamısı</Option>*/}
                    {/*                {allPropertyType &&*/}
                    {/*                allPropertyType.map((opt) => (*/}
                    {/*                    <Option key={opt.key} value={opt.key}>*/}
                    {/*                        {opt.name}*/}
                    {/*                    </Option>*/}
                    {/*                ))}*/}
                    {/*            </Select>*/}
                    {/*        </div>*/}
                    {/*    </Col>*/}
                    {/*    <Col xs={12} md={4}>*/}
                    {/*        <div*/}
                    {/*            style={{*/}
                    {/*                marginTop: "15px",*/}
                    {/*            }}*/}
                    {/*        >*/}
                    {/*            <label className="m-r-05">Satışdadır</label>*/}
                    {/*            <Switch*/}
                    {/*                checked={salesStatus?.value === "true"}*/}
                    {/*                checkedChildren="bəli"*/}
                    {/*                unCheckedChildren="xeyr"*/}
                    {/*                onChange={(e) =>*/}
                    {/*                    setSalesStatus({*/}
                    {/*                        ...salesStatus,*/}
                    {/*                        value: String(e),*/}
                    {/*                        field: "salesStatus",*/}
                    {/*                        operator: "eq",*/}
                    {/*                    })*/}
                    {/*                }*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*    </Col>*/}
                    {/*    <Col xs={12} md={3}>*/}
                    {/*        <div*/}
                    {/*            style={{*/}
                    {/*                marginTop: "15px",*/}
                    {/*            }}*/}
                    {/*        >*/}
                    {/*            <label className="m-r-05">İcarədədir</label>*/}
                    {/*            <Switch*/}
                    {/*                checked={rentStatus?.value === "true"}*/}
                    {/*                checkedChildren="bəli"*/}
                    {/*                unCheckedChildren="xeyr"*/}
                    {/*                onChange={(e) =>*/}
                    {/*                    setRentStatus({*/}
                    {/*                        ...rentStatus,*/}
                    {/*                        value: String(e),*/}
                    {/*                        field: "rentStatus",*/}
                    {/*                        operator: "eq",*/}
                    {/*                    })*/}
                    {/*                }*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*    </Col>*/}
                    {/*    <Col xs={12} md={3}>*/}
                    {/*        <div*/}
                    {/*            style={{*/}
                    {/*                marginTop: "15px",*/}
                    {/*            }}*/}
                    {/*        >*/}
                    {/*            <label className="m-r-05">Kommunal</label>*/}
                    {/*            <Switch*/}
                    {/*                checked={communalActive?.value === "true"}*/}
                    {/*                checkedChildren="bəli"*/}
                    {/*                unCheckedChildren="xeyr"*/}
                    {/*                onChange={(e) =>*/}
                    {/*                    setCommunalActive({*/}
                    {/*                        ...communalActive,*/}
                    {/*                        value: String(e),*/}
                    {/*                        field: "communalActive",*/}
                    {/*                        operator: "eq",*/}
                    {/*                    })*/}
                    {/*                }*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*    </Col>*/}
                    {/*    <Col xs={24} md={3}>*/}
                    {/*        <Button*/}
                    {/*            disabled={*/}
                    {/*                !(*/}
                    {/*                    name?.value ||*/}
                    {/*                    projectName?.value ||*/}
                    {/*                    propertyTypeName?.value ||*/}
                    {/*                    salesPrice?.value ||*/}
                    {/*                    rentPrice?.value ||*/}
                    {/*                    salesStatus?.value ||*/}
                    {/*                    rentStatus?.value ||*/}
                    {/*                    block?.value ||*/}
                    {/*                    floor?.value ||*/}
                    {/*                    room?.value ||*/}
                    {/*                    communalActive?.value*/}
                    {/*                )*/}
                    {/*            }*/}
                    {/*            className="btn btn-round btn-block btn-warning lift "*/}
                    {/*            style={{*/}
                    {/*                padding: "0.2rem 0.75rem",*/}
                    {/*                fontWeight: "500",*/}
                    {/*                width: "95%",*/}
                    {/*                marginTop: "15px",*/}
                    {/*            }}*/}
                    {/*            onClick={onFilterData}*/}
                    {/*        >*/}
                    {/*            Təsdiqlə*/}
                    {/*        </Button>*/}
                    {/*    </Col>*/}
                    {/*    <Col xs={24} md={3}>*/}
                    {/*        <Button*/}
                    {/*            disabled={*/}
                    {/*                name?.value ||*/}
                    {/*                projectName?.value ||*/}
                    {/*                propertyTypeName?.value ||*/}
                    {/*                salesPrice?.value ||*/}
                    {/*                rentPrice?.value ||*/}
                    {/*                salesStatus?.value ||*/}
                    {/*                rentStatus?.value ||*/}
                    {/*                block?.value ||*/}
                    {/*                floor?.value ||*/}
                    {/*                room?.value ||*/}
                    {/*                communalActive?.value*/}
                    {/*                    ? false*/}
                    {/*                    : !location.state*/}
                    {/*            }*/}
                    {/*            className="btn btn-round btn-block  lift btn-disable-block"*/}
                    {/*            style={{*/}
                    {/*                padding: "0.2rem 0.75rem",*/}
                    {/*                fontWeight: "500",*/}
                    {/*                width: "95%",*/}
                    {/*                marginTop: "15px",*/}
                    {/*            }}*/}
                    {/*            // onClick={onRefleshFilter}*/}
                    {/*        >*/}
                    {/*            Filteri sıfırla*/}
                    {/*        </Button>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
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
                <PropertyCrudForm
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

                />
            </CrudDrawer>
        </>
    );
};

export default Property;
