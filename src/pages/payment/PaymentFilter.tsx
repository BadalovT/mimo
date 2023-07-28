import {Button, Col, DatePicker, Input, InputNumber, Row, Select, Slider, Switch, TimePicker} from "antd";
import React, {useContext} from "react";
import {BlockRes, FloorRes} from "../../types/lookUpType";
import {FilterContext} from "./context/filterContext";
import {useAppSelector} from "../../redux/hook";


const {RangePicker} = DatePicker;
const {Option} = Select;

type PaymentFilterProps = {

    onFilterData: () => void;
    onRefleshFilter: () => void;
};


const PaymentFilter = ({
                            onFilterData,
                            onRefleshFilter,
                        }: PaymentFilterProps) => {
    const {filter, setFilter, updateFilterByKey} = useContext(FilterContext)
    const {
        allPaymentType

    } = useAppSelector((state) => state.lookUpSlice);
    return (
        <>
            <Row gutter={[16, 16]}>
                    <Col xs={12} md={6}>
                        <div>
                            <label className="m-r-1">Mülk adı</label>
                            <Input
                                className="form-control-sm form-control mb-50"
                                autoComplete="off"
                                placeholder="name"
                                value={filter?.ContractNo?.value}
                                onChange={(e) => {
                                    updateFilterByKey(e.target.value, "ContractNo")
                                }   }
                            />
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div>
                            <label className="m-r-1">Satış qiyməti</label>
                            <InputNumber
                                style={{ width: '100%' }}
                                className="form-control-sm form-control mb-50"
                                autoComplete="off"
                                type="number"
                                placeholder="Satış qiyməti"
                                value={filter?.PaymentAmount?.value}
                                onChange={(value) => updateFilterByKey(String(value), 'PaymentAmount')}
                            />
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div>
                            <label className="m-r-1">Ödəniş tarixi</label>
                            <Input
                                className="form-control-sm form-control mb-50"
                                autoComplete="off"
                                placeholder="Ödəniş tarixi"
                                value={filter?.PaymentDate?.value}
                                onChange={(e) => updateFilterByKey(e.target.value, 'PaymentDate')}
                            />
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div>
                            <label className="m-r-1">Ödəniş növü</label>
                            <Select
                                style={{
                                    width: "100%",
                                }}
                                showSearch
                                placeholder="Ödəniş növü seçin"
                                optionFilterProp="children"
                                value={filter.PaymentTypeName?.value ?+filter.PaymentTypeName?.value : null}
                                onChange={(e, select) =>
                                    updateFilterByKey(String(e), "PaymentTypeName")
                                }
                                filterOption={(input: string, option: any) =>
                                    option?.children
                                        ?.toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                            >
                                <Option value="">heç biri</Option>
                                {allPaymentType &&
                                    allPaymentType.map((opt) => (
                                        <Option key={opt.key} value={opt.key}>
                                            {opt.name}
                                        </Option>
                                    ))}
                            </Select>
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div>
                            <label className="m-r-1">İl</label>
                            <InputNumber
                                style={{ width: '100%' }}
                                className="form-control-sm form-control mb-50"
                                autoComplete="off"
                                type="number"
                                placeholder="İl"
                                value={filter?.Year?.value}
                                onChange={(value) => updateFilterByKey(String(value), 'Year')}
                            />
                        </div>
                    </Col>
                <Col xs={24} md={3}>
                    <Button
                        disabled={
                            !(
                                filter?.ContractNo?.value ||
                                filter?.PaymentAmount?.value ||
                                filter?.PaymentDate?.value ||
                                filter?.PaymentTypeName?.value ||
                                filter?.Year?.value
                            )
                        }
                        className="btn btn-round btn-block btn-warning lift"
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
                <Col xs={24} md={3}>
                    <Button
                        // disabled={
                        //     name?.value ||
                        //     projectName?.value ||
                        //     paymentTypeName?.value ||
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

export default PaymentFilter;
