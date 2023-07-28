import {Button, Card, Col, Form, Pagination, Popconfirm, Popover, Row, Select, Space, Table,Tag} from "antd";
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
// import PropertyCrudForm from "./PropertyCrudForm";
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
import {Tabs} from "antd/lib";
import TabPane = Tabs.TabPane;
import {
    approveUserContact,
    deleteUserContact,
    getAllMyContactsByDynamic,
    getAllToReceiverByDynamic,
    getAllToSenderByDynamic, GetListContractByPaymentList
} from "../../redux/store/features/userContactAccessSlice";
import {log} from "util";
// import PropertyFilter from "./propertyFilter";
// import {FilterContext} from "./context/filterContext";


const {Option} = Select;
const ContractsByPayment = (contractKey:any) => {
    const controller = "Gələn sorğular";
    const [mode, setMode] = useState("new");
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const navigate = useNavigate();

    const location = useLocation();
    const [obj, setObj] = useState<filterState | {}>({});

    const {ListContractByPaymentList} = useAppSelector((state) => state.userContactAccessSlice);
    // const {filter, setFilter, updateFilterByKey} = useContext(FilterContext)

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


    const [form] = Form.useForm();

    const dispatch = useAppDispatch();

    // const { allPropertyPaging } = useAppSelector((state) => state.propertyReducer);
    const {allPropertyPaging, loading, isOpenModal, formValue} = useAppSelector(
        (state) => state.propertySlice
    );

    useEffect(() => {
        // dispatch(getAllMyContactsByDynamic({ page: 0, pageSize: 10, obj: {} }));
        dispatch(GetListContractByPaymentList(contractKey.contractKey));
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
        dispatch(approveUserContact(record.key)).unwrap().then((result) => {
            if (result) {
                dispatch(
                    getAllToReceiverByDynamic({
                        page: 0,
                        pageSize: pageSize,
                        obj: obj,
                    })
                );
            }
        }   );
    };

    const getMenu = (record: allPropertyItem) => (
        <ul className="dropDown">
            <li
                onClick={() => {
                    propertyByKey(record);
                }}
            >
                <button className="btn btn-outline-fff text-green f-s-15">
                    <CheckCircleOutlined style={{marginRight: "10px"}}/> Təsdiqlə
                </button>
            </li>

            <Popconfirm
                title={`Lahiyə: ${record.name}`}
                description="Silmək istədiyinizdən əminsiniz?"
                okText="Bəli"
                cancelText="Xeyr"
                onConfirm={() => {
                    dispatch(deleteUserContact(record.key)).unwrap().then((result) => {
                            if (result) {
                                dispatch(
                                    getAllToReceiverByDynamic({
                                        page: 0,
                                        pageSize: pageSize,
                                        obj: obj,
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
            title: "Kontrakt nömrəsi",
            dataIndex: "businessContractName",
            key: "businessContractName",
        },
        {
            title: "Məbləğ",
            dataIndex: "paymentAmount",
            key: "paymentAmount",
        },
        {
            title: "Ödəniş tarixi",
            dataIndex: "paymentDate",
            key: "paymentDate",
        }, {
            title: "İl",
            dataIndex: "year",
            key: "year",
        },
        {
            title: 'Aylar',
            key: 'monthId',
            dataIndex: 'monthId',
            render: (_:any, { monthId }:any) => (
                <>
                    {monthId?.map((tag:any) => {
                        return (
                            <Tag color={"blue"} key={tag}>
                                {tag.name}
                            </Tag>
                        );
                    })}
                </>
            ),
        },

    ];




    const onShowSizeChange = (newCurrent: number, newPageSize: number) => {
        if (pageSize !== newPageSize) {
            dispatch(
                getAllToSenderByDynamic({
                    page: 0,
                    pageSize: newPageSize,
                    obj: obj,
              })
           );
        } else {
            dispatch(
                getAllToSenderByDynamic({
                    page: newCurrent - 1,
                    pageSize: newPageSize,
                    obj: obj,
                })
            );
        }
        setPageSize(newPageSize);
        setCurrent(pageSize !== newPageSize ? 1 : newCurrent);
    };
    console.log(ListContractByPaymentList, "ListContractByPaymentList")
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
                    dataSource={ListContractByPaymentList}
                    pagination={false}
                />
                {/*<Pagination*/}
                {/*    // showQuickJumper*/}
                {/*    showSizeChanger*/}
                {/*    onChange={onShowSizeChange}*/}
                {/*    pageSize={pageSize}*/}
                {/*    current={current}*/}
                {/*    total={allReceiverByDynamic.count}*/}
                {/*    locale={{items_per_page: "/ səhifə"}}*/}
                {/*    style={{padding: "12px"}}*/}
                {/*/>*/}
            </>
        </>
    );
};

export default ContractsByPayment;
