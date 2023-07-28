import {Button, Col, DatePicker, Input, InputNumber, Row, Select, Slider, Switch, TimePicker} from "antd";
import React, {useContext} from "react";
import {BlockRes, FloorRes, ContractTypeRes} from "../../types/lookUpType";
import {FilterContext} from "./context/filterContext";
import {useAppSelector} from "../../redux/hook";
import dayjs from "dayjs";


const {RangePicker} = DatePicker;
const {Option} = Select;

type ContractFilterProps = {

    onFilterData: () => void;
    onRefleshFilter: () => void;
};


const ContractFilter = ({
                            onFilterData,
                            onRefleshFilter,
                        }: ContractFilterProps) => {
    const {filter, setFilter, updateFilterByKey} = useContext(FilterContext)
    const {
        allContractType,

    } = useAppSelector((state) => state.lookUpSlice);
    return (
        <>
            <Row gutter={[16, 16]}>
                <Col xs={12} md={6}>
                    <div>
                        <label className="m-r-1">Müqavilə nömrəsi</label>
                        <Input
                            className=" form-control-sm form-control mb-50"
                            autoComplete="off"
                            placeholder="Müqavilə nömrəsi daxil edin"
                            value={filter?.ContractNo?.value}
                            onChange={(e) => {
                                // setName({
                                //     ...name,
                                //     value: e.target.value,
                                //     field: "name",
                                //     operator: "contains",
                                // })
                                updateFilterByKey(e.target.value, "ContractNo")
                            }
                            }
                        />
                    </div>
                </Col>
                <Col xs={12} md={6}>
                    <div>
                        <label className="m-r-1">Mulk Adi</label>
                        <Input
                            className=" form-control-sm form-control mb-50"
                            autoComplete="off"
                            placeholder="Mulk Adi"
                            value={filter?.PropertyName?.value}
                            onChange={(e) => {
                                // setName({
                                //     ...name,
                                //     value: e.target.value,
                                //     field: "name",
                                //     operator: "contains",
                                // })
                                updateFilterByKey(e.target.value, "PropertyName")
                            }
                            }
                        />
                    </div>
                </Col>

                <Col xs={12} md={6}>
                    <div>
                        <label className="m-r-1">Müqavilə növü</label>
                        <Select
                            style={{
                                width: "100%",
                            }}
                            showSearch
                            placeholder="Mülk növü seçin"
                            optionFilterProp="children"
                            value={filter?.ContractTypeId?.value ?+filter?.ContractTypeId?.value : null}
                            onChange={(e, select) =>
                                updateFilterByKey(String(e), "ContractTypeId")
                            }
                            filterOption={(input: string, option: any) =>
                                option?.children
                                    ?.toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                        >
                            <Option value="">heç biri</Option>
                            {allContractType &&
                            allContractType.map((opt) => (
                                <Option key={opt.key} value={opt.key}>
                                    {opt.name}
                                </Option>
                            ))}
                        </Select>
                    </div>
                </Col>
                <Col xs={12} md={6}>
                    <div>
                        <label className="m-r-1">Mebleğ</label>
                        <Input
                            className=" form-control-sm form-control mb-50"
                            autoComplete="off"
                            placeholder="Mebleğ daxil edin"
                            value={filter?.ContractAmount?.value}
                            onChange={(e) => {
                                // setName({
                                //     ...name,
                                //     value: e.target.value,
                                //     field: "name",
                                //     operator: "contains",
                                // })
                                updateFilterByKey(e.target.value, "ContractAmount")
                            }
                            }
                        />
                    </div>
                </Col>
                <Col xs={12} md={6}>
                    <div>
                        <label className="m-r-1">Başlama tarixi</label>
                        {
                            filter?.StartDate?.value ?
                                <DatePicker
                                    inputReadOnly={true}
                                    style={{
                                        width: "100%",
                                    }}
                                    format="DD-MM-YYYY"
                                    value={dayjs(filter?.StartDate?.value, "DD-MM-YYYY") }
                                    onChange={(e) => {
                                        updateFilterByKey(e, "StartDate")
                                    }
                                    }
                                /> :
                                <DatePicker
                                    inputReadOnly={true}
                                    style={{
                                        width: "100%",
                                    }}
                                    format="DD-MM-YYYY"
                                    onChange={(e) => {
                                        updateFilterByKey(e, "StartDate")
                                    }
                                    }
                                />
                        }
                    </div>
                </Col>
                <Col xs={12} md={6}>
                    <div>
                        <label className="m-r-1">Bitmə tarixi</label>
                        {
                            filter?.EndDate?.value ?
                                <DatePicker
                                    inputReadOnly={true}
                                    style={{
                                        width: "100%",
                                    }}
                                    format="DD-MM-YYYY"
                                    value={dayjs(filter?.EndDate?.value, "DD-MM-YYYY") }
                                    onChange={(e) => {
                                        updateFilterByKey(e, "EndDate")
                                    }
                                    }
                                /> :
                                <DatePicker
                                    inputReadOnly={true}
                                    style={{
                                        width: "100%",
                                    }}
                                    format="DD-MM-YYYY"
                                    onChange={(e) => {
                                        updateFilterByKey(e, "EndDate")
                                    }
                                    }
                                />
                        }
                    </div>
                </Col>
                <Col xs={12} md={6}>
                    <div>
                        <label className="m-r-1">Tam ad</label>
                        <Input
                            className=" form-control-sm form-control mb-50"
                            autoComplete="off"
                            placeholder="Tam ad daxil edin"
                            value={filter?.FullName?.value}
                            onChange={(e) => {
                                // setName({
                                //     ...name,
                                //     value: e.target.value,
                                //     field: "name",
                                //     operator: "contains",
                                // })
                                updateFilterByKey(e.target.value, "FullName")
                            }
                            }
                        />
                    </div>
                </Col>
                <Col xs={12} md={6}>

                </Col>
                <Col xs={24} md={6}>
                    <Button
                        disabled={
                            !(
                                filter?.ContractNo?.value ||
                                filter?.ContractTypeId?.value ||
                                filter?.ContractAmount?.value ||
                                filter?.Phone?.value ||
                                filter?.PropertyName?.value ||
                                filter?.StartDate?.value ||
                                filter?.EndDate?.value ||
                                filter?.FullName?.value
                            )
                        }
                        className="btn btn-round btn-block btn-warning lift "
                        style={{
                            padding: "0.2rem 0.75rem",
                            fontWeight: "500",
                            width: "95%",
                            marginTop: "15px",
                        }}
                        onClick={onFilterData}
                    >
                        Təsdiqlə
                    </Button>
                </Col>
                <Col xs={24} md={6}>
                    <Button
                        // disabled={
                        //     name?.value ||
                        //     projectName?.value ||
                        //     propertyTypeName?.value ||
                        //     salesPrice?.value ||
                        //     rentPrice?.value ||
                        //     salesStatus?.value ||
                        //     rentStatus?.value ||
                        //     block?.value ||
                        //     floor?.value ||
                        //     room?.value ||
                        //     communalActive?.value
                        //         ? false
                        //         : !location.state
                        // }
                        className="btn btn-round btn-block  lift btn-disable-block"
                        style={{
                            padding: "0.2rem 0.75rem",
                            fontWeight: "500",
                            width: "95%",
                            marginTop: "15px",
                        }}
                        onClick={onRefleshFilter}
                    >
                        Filteri sıfırla
                    </Button>
                </Col>
            </Row>
        </>

    );
};

export default ContractFilter;
