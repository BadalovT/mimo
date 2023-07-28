import {Button, Card, Col, Form, Pagination, Popconfirm, Popover, Row, Select, Space, Table,} from "antd";
import React, {useContext, useEffect, useState} from "react";
// import { Helmet } from "react-helmet-async";
import FullWidthCard from "../../components/card/FullWidthCard";
import {Plus} from "react-feather";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined, DollarCircleFilled, DollarOutlined,
    EditOutlined, HomeOutlined,
    MoreOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "../../redux/hook";
import CrudDrawer from "../../components/drawer/CrudDrawer";
import {filterState, allPropertyItem} from "../../types/property";
// import PropertyCrudForm from "./PropertyCrudForm";
import {
    addProperty,
    deleteProperty,
    getAllPropertyPagingService,
    propertyById,
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
import {Tabs} from "antd/lib";
import TabPane = Tabs.TabPane;
import {
    approveUserContact,
    deleteUserContact,
    getAllMyContactsByDynamic,
    getAllToReceiverByDynamic,
    getAllToSenderByDynamic, GetByIdContractByPropertyDetail,
    GetListBusinessContractByUser, GetListContractByPaymentList,
    toggleModal
} from "../../redux/store/features/userContactAccessSlice";
import PropertyCrudForm from "../property/PropertyCrudForm";
import PropertyDetails from "./PropertyDetails";
import {PaymentOutlined} from "@mui/icons-material";
import ContractsByPayment from "./ContractsByPayment";
// import PropertyFilter from "./propertyFilter";
// import {FilterContext} from "./context/filterContext";


const {Option} = Select;
const MyBusinessContracts = () => {
    const controller = "Gələn sorğular";
    const [mode, setMode] = useState("propertyDetail");
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [contractKey, setcontractKey] = useState(0);
    const navigate = useNavigate();

    const location = useLocation();
    const [obj, setObj] = useState<filterState | {}>({});

    const {ListContractByPaymentList,allBusinessContractByUser,ByIdContractByPropertyDetail,isOpenModal} = useAppSelector((state) => state.userContactAccessSlice);
    // const {filter, setFilter, updateFilterByKey} = useContext(FilterContext)
    // const {ListContractByPaymentList} = useAppSelector((state) => state.userContactAccessSlice);


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

    // useEffect(() => {
    //     setFilter({
    //         ...filter,
    //         name: {...filter.name, value: searchParams.get("name") || "",},
    //         area: {...filter.area, value: searchParams.get("area") || "",},
    //         rentPrice: {...filter.rentPrice, value: searchParams.get("rentPrice") || "",},
    //         rentStatus: {...filter.rentStatus, value: searchParams.get("rentStatus") || "",},
    //         propertyTypeId: {...filter.propertyTypeId, value: searchParams.get("propertyTypeId") || "",},
    //         blockId: {...filter.blockId, value: searchParams.get("blockId") || "",},
    //         floorId: {...filter.floorId, value: searchParams.get("floorId") || "",},
    //         roomId: {...filter.roomId, value: searchParams.get("roomId") || "",},
    //         stateId: {...filter.stateId, value: searchParams.get("stateId") || "",},
    //         cityId: {...filter.cityId, value: searchParams.get("cityId") || "",},
    //         metroId: {...filter.metroId, value: searchParams.get("metroId") || "",},
    //         isRepair: {...filter.isRepair, value: searchParams.get("isRepair") || "",},
    //     })
    //     // dispatch(
    //     //     getAllPropertyPagingService({
    //     //         page: 0,
    //     //         pageSize: pageSize,
    //     //         filterState: obj,
    //     //     })
    //     // );
    //
    // }, []);


    // const onRefleshFilter = () => {
    //
    //     setFilter({
    //         ...filter,
    //         name: {...filter.name, value: "",},
    //         area: {...filter.area, value: "",},
    //         rentPrice: {...filter.rentPrice, value: "",},
    //         rentStatus: {...filter.rentStatus, value: "",},
    //         propertyTypeId: {...filter.propertyTypeId, value: "",},
    //         blockId: {...filter.blockId, value: "",},
    //         floorId: {...filter.floorId, value: "",},
    //         roomId: {...filter.roomId, value: "",},
    //         stateId: {...filter.stateId, value: "",},
    //         cityId: {...filter.cityId, value: "",},
    //         metroId: {...filter.metroId, value: "",},
    //         isRepair: {...filter.isRepair, value: "",},
    //     })
    //
    //     navigate(location.pathname);
    //     dispatch(
    //         getAllPropertyPagingService({
    //             page: 0,
    //             pageSize: pageSize,
    //             filterState: obj,
    //         })
    //     );
    // };

    // const onFilterData = () => {
    //     const values = [
    //         filter.name,
    //         filter.area,
    //         filter.rentPrice,
    //         filter.rentStatus,
    //         filter.propertyTypeId,
    //         filter.blockId,
    //         filter.floorId,
    //         filter.roomId,
    //         filter.stateId,
    //         filter.cityId,
    //         filter.metroId,
    //         filter.isRepair
    //     ];
    //     const noEmptyValues = values.filter((x) => x?.value !== "");
    //     const noEmptyValues1 = values.filter((x) => x?.value !== "");
    //     objectToQueryString(values);
    //     let without0index = noEmptyValues1.shift();
    //     if (noEmptyValues.length === 1) {
    //         let objOne = {
    //             filter: {
    //                 field: noEmptyValues[0]?.field,
    //                 operator: noEmptyValues[0]?.operator,
    //                 value: noEmptyValues[0]?.value,
    //             },
    //         } as filterState;
    //         // console.log(objOne);
    //         objectToQueryString(values);
    //         dispatch(
    //             getAllPropertyPagingService({
    //                 page: 0,
    //                 pageSize: pageSize,
    //                 filterState: objOne,
    //             })
    //         );
    //     } else if (noEmptyValues.length === 0) {
    //         objectToQueryString(values);
    //
    //         dispatch(
    //             getAllPropertyPagingService({
    //                 page: 0,
    //                 pageSize: pageSize,
    //                 filterState: obj,
    //             })
    //         );
    //     } else {
    //         let objMoreThanOne = {
    //             filter: {
    //                 field: noEmptyValues[0]?.field,
    //                 operator: noEmptyValues[0]?.operator,
    //                 value: noEmptyValues[0]?.value,
    //                 logic: "and",
    //                 filters: noEmptyValues1,
    //             },
    //         };
    //         objectToQueryString(values);
    //         dispatch(
    //             getAllPropertyPagingService({
    //                 page: 0,
    //                 pageSize: pageSize,
    //                 filterState: objMoreThanOne,
    //             })
    //         );
    //     }
    //     // search.set('projectName', `${projectName.value}`);
    //     // search.set('salesPrice', `${salesPrice.value}`);
    //     // setSearch(search, {
    //     //   replace: true,
    //     // });
    // };

    const [form] = Form.useForm();

    const dispatch = useAppDispatch();

    // const { allPropertyPaging } = useAppSelector((state) => state.propertyReducer);
    const {allPropertyPaging, loading, formValue} = useAppSelector(
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
        // dispatch(getAllMyContactsByDynamic({ page: 0, pageSize: 10, obj: {} }));
        dispatch(GetListBusinessContractByUser({ page: 0, pageSize: 10, obj: {} }));
    }, []);

    useEffect(() => {
        // if (formValue.tenantTypeId) {
        //     form.setFieldsValue(formValue);
        // } else {
        //     form.resetFields();
        // }
        form.setFieldsValue(ByIdContractByPropertyDetail);
    }, [ByIdContractByPropertyDetail]);

    const showDrawer = (mode: string) => {
        dispatch(toggleModal());
        // setIsModalVisible(true);
        setMode(mode);
    };

    const propertyByKey = (record: allPropertyItem) => {
        dispatch(GetByIdContractByPropertyDetail(record.key));
        showDrawer("propertyDetail");
    };
    const paymentByKey = (record: allPropertyItem) => {
        // dispatch(GetListContractByPaymentList(record.key));
        setcontractKey(record.key)
        showDrawer("paymentList");

    };

    const getMenu = (record: allPropertyItem) => (
        <ul className="dropDown">
            <li
                onClick={() => {
                    propertyByKey(record);
                }}
            >
                <button className="btn btn-outline-fff text-blue f-s-15">
                    <HomeOutlined style={{marginRight: "10px"}}/> Mənzil məlumatları
                </button>
            </li>
            <li
                onClick={() => {
                    paymentByKey(record);
                }}
            >
                <button className="btn btn-outline-fff text-blue f-s-15">
                    <DollarOutlined style={{marginRight: "10px"}}/> Müqavilə üzrə ödənişlər
                </button>
            </li>


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
            title: "Müqavilə №",
            dataIndex: "contractNo",
            key: "contractNo",
        },
        {
            title: "Sahə",
            dataIndex: "area",
            key: "area",
        },{
            title: "Blok",
            dataIndex: "blockName",
            key: "blockName",
        },{
            title: "Müqavilə növü",
            dataIndex: "businessContractTypeName",
            key: "businessContractTypeName",
        },{
            title: "Mülkiyyət növü",
            dataIndex: "businessPropertyName",
            key: "businessPropertyName",
        },{
            title: "Komendant qiyməti",
            dataIndex: "comendantPrice",
            key: "comendantPrice",
        },{
            title: "Müqavilə qiyməti",
            dataIndex: "contractAmount",
            key: "contractAmount",
        },{
            title: "Başlama tarixi",
            dataIndex: "startDate",
            key: "startDate",
        },{
            title: "Bitmə tarixi",
            dataIndex: "endDate",
            key: "endDate",
        },{
            title: "Mərtəbə",
            dataIndex: "floorName",
            key: "floorName",
        },{
            title: "Otaq",
            dataIndex: "roomName",
            key: "roomName",
        },{
            title: "Layihə",
            dataIndex: "projectName",
            key: "projectName",
        },

    ];




    const onShowSizeChange = (newCurrent: number, newPageSize: number) => {
        if (pageSize !== newPageSize) {
            dispatch(
                GetListBusinessContractByUser({
                    page: 0,
                    pageSize: newPageSize,
                    obj: obj,
              })
           );
        } else {
            dispatch(
                GetListBusinessContractByUser({
                    page: newCurrent - 1,
                    pageSize: newPageSize,
                    obj: obj,
                })
            );
        }
        setPageSize(newPageSize);
        setCurrent(pageSize !== newPageSize ? 1 : newCurrent);
    };
    console.log(mode,"mode")
    return (
        <>
            <>
                <Table
                    // scroll={{ x: 1300}}
                    scroll={
                        window.innerHeight > 900
                            ? {x: 1300, y: window.innerHeight - 420}
                            : {x: 1300, y: 350}
                    }
                    columns={column}
                    dataSource={allBusinessContractByUser.items}
                    pagination={false}
                />
                <Pagination
                    // showQuickJumper
                    showSizeChanger
                    onChange={onShowSizeChange}
                    pageSize={pageSize}
                    current={current}
                    total={allBusinessContractByUser.count}
                    locale={{items_per_page: "/ səhifə"}}
                    style={{padding: "12px"}}
                />
            </>,
            <CrudDrawer
                width={mode === "propertyDetail" ?500 : 800}
                mode={mode}
                // isModalVisible={isModalVisible}
                isOpenModal={isOpenModal}
                handleCancel={handleCancel}
                handleOk={handleOk}
                controller={controller}
                loading={loading}
            >
                {mode === "propertyDetail" ?<PropertyDetails
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

                />: <ContractsByPayment contractKey={contractKey}/>}
            </CrudDrawer>
        </>
    );
};

export default MyBusinessContracts;
