import {
    Col,
    Form,
    FormInstance,
    Input,
    Row,
    Select,
    DatePicker,
    Checkbox, Spin, Button,
} from "antd";
import React, {useEffect, useState} from "react";
import { ContractTypeRes } from "../../types/lookUpType";
import moment from "moment";
import { userContactAccessItem } from "../../types/userContactAccess";
import {useAppDispatch, useAppSelector} from "../../redux/hook";
import AsyncSelect from "./AsyncSelect";
import axios from "axios";
import {userContractTypeUserAccess} from "../../types/userContractType";

type Type = {
    mode: string;
    form: FormInstance<any>;
    allContractType: userContractTypeUserAccess[];
    allUserContactAccess: userContactAccessItem[];
};

const { Option } = Select;

interface OptionType {
    value: string;
    label: string;
}

const ContractCrudForm = ({
                              form,
                              mode,
                              allContractType,
                              allUserContactAccess,
                          }: Type) => {
    const [options, setOptions] = useState<OptionType[]>();
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<object | undefined>(undefined); // add state for selected value

    const handleSearch = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`https://apitest.mimo.az/api/BusinessProperty/GetByName/${searchValue}`);
            const data = response.data;

            const options = [{
                value: data.key,
                label: data.name,
            }];

            setOptions(options);
            setOpen(true);
        } catch (error) {
            console.error(error);
            handleClear()
        }

        setLoading(false);
    };

    const handleInputChange = (value: string) => {
        console.log(value, 'value')
        value && setSearchValue(value);
    };

    const handleClear = () => {
        setSearchValue('');
        setOptions([]);
        setOpen(false);
        setValue({});
    };



    const handleDropdownVisibleChange = (open: boolean) => {
        setOpen(open);
    };

    const [propertyId, setPropertyId] = useState<string | undefined>(undefined); // add state for selected value
    const [propertyName, setPropertyName] = useState<string | undefined>(undefined); // add state for selected value

    const fullName = form.getFieldValue("fullName")
    console.log(fullName, 'fullName')

    useEffect(() => {
        setPropertyId(form.getFieldValue("propertyId"))
        setPropertyName(form.getFieldValue("propertyName"))
        if (propertyName && propertyId) {
            const options = [{
                value: propertyId,
                label: propertyName,
            }];
            setOptions(options);
        }
        console.log(options, 'options')
    }, [open]);

    return (
        <>
            <Form
                form={form}
                layout="vertical"
                autoComplete="off"
                style={{ margin: "10px" }}
            >
                <Row>
                    <Col xs={24} md={24}>
                        <Form.Item
                            name="contractNo"
                            label="Müqavilə nömrəsi"
                            rules={[
                                {
                                    required: true,
                                    message: "müqavilə nömrəsi boş ola bilməz",
                                },
                            ]}
                        >
                            <Input placeholder="müqavilə nömrəsi" />
                        </Form.Item>
                        <Form.Item
                            name="businessPropertyId"
                            label="Mülk adı"
                            rules={[
                                {
                                    required: true,
                                    message: "Mülk adı boş ola bilməz",
                                },
                            ]}
                            // initialValue={initialValue} // set the initial value of the field
                        >
                            <Select
                                showSearch
                                loading={loading}
                                onSearch={handleInputChange}
                                placeholder={loading ? 'Loading...' : 'Select a property'}
                                options={options}
                                open={open}
                                onDropdownVisibleChange={handleDropdownVisibleChange}
                                onBlur={() => setOpen(false)}
                                filterOption={false}
                                notFoundContent={loading ? <Spin size="small" /> : 'No options found'}
                                style={{ width: 200 }}
                                onChange={(value, option) => form.setFieldsValue({ businessPropertyId: value })} // update the form field value
                                value={form.getFieldValue("businessPropertyId")} // get the field value from the form
                            />
                            <Button type="primary" onClick={handleSearch} style={{ marginRight: 8 }}>
                                Axtar
                            </Button>
                            <Button onClick={handleClear}>Təmizlə</Button>
                            {/*<AsyncSelect/>*/}
                        </Form.Item>
                        <Form.Item
                            name="businessContractTypeId"
                            label="Müqavilə növü"
                            rules={[
                                {
                                    required: true,
                                    message: "müqavilə növü boş ola bilməz",
                                },
                            ]}
                        >
                            <Select
                                placeholder="laymüqaviləihə növü seçin"
                                optionFilterProp="children"
                                showSearch
                            >
                                <Option value="">Heç biri</Option>
                                {allContractType?.map((opt) => (
                                    <Option key={opt?.businessContractTypeId} value={opt?.businessContractTypeId}>
                                        {opt?.businessContractTypeName}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>{" "}
                        {mode === "new" ? (
                            <Form.Item
                                name="startDate"
                                label="Başlama tarixi"
                                rules={[
                                    {
                                        required: true,
                                        message: "başlama tarixi boş ola bilməz",
                                    },
                                ]}
                            >
                                <DatePicker
                                    inputReadOnly={true}
                                    style={{
                                        width: "100%",
                                    }}
                                    format="DD-MM-YYYY"
                                />
                            </Form.Item>
                        ) : (
                            <Form.Item
                                noStyle
                                shouldUpdate={(prevValues, currentValues) =>
                                    prevValues.birthday !== null
                                }
                            >
                                {({ getFieldValue }) =>
                                    getFieldValue("startDate") ? (
                                        <Form.Item
                                            name="startDate"
                                            label="Başlama tarixi"
                                            // getValueFromEvent={(onChange) =>
                                            //   moment(onChange).format("DD-MM-YYYY")
                                            // }
                                            getValueProps={(i) => ({ value: moment(i) })}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "başlama tarixi boş ola bilməz",
                                                },
                                            ]}
                                        >
                                            <DatePicker
                                                inputReadOnly={true}
                                                style={{
                                                    width: "100%",
                                                }}
                                                format="DD-MM-YYYY"
                                            />
                                        </Form.Item>
                                    ) : (
                                        <Form.Item
                                            name="startDate"
                                            label="Başlama tarixi"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "başlama tarixi boş ola bilməz",
                                                },
                                            ]}
                                        >
                                            <DatePicker
                                                inputReadOnly={true}
                                                style={{
                                                    width: "100%",
                                                }}
                                                format="DD-MM-YYYY"
                                            />
                                        </Form.Item>
                                    )
                                }
                            </Form.Item>
                        )}
                        {mode === "new" ? (
                            <Form.Item name="endDate" label="Bitmə tarixi">
                                <DatePicker
                                    inputReadOnly={true}
                                    style={{
                                        width: "100%",
                                    }}
                                    format="DD-MM-YYYY"
                                />
                            </Form.Item>
                        ) : (
                            <Form.Item
                                noStyle
                                shouldUpdate={(prevValues, currentValues) =>
                                    prevValues.birthday !== null
                                }
                            >
                                {({ getFieldValue }) =>
                                    getFieldValue("endDate") ? (
                                        <Form.Item
                                            name="endDate"
                                            label="Bitmə tarixi"
                                            // getValueFromEvent={(onChange) =>
                                            //   moment(onChange).format("DD-MM-YYYY")
                                            // }
                                            getValueProps={(i) => ({ value: moment(i) })}
                                        >
                                            <DatePicker
                                                inputReadOnly={true}
                                                style={{
                                                    width: "100%",
                                                }}
                                                format="DD-MM-YYYY"
                                            />
                                        </Form.Item>
                                    ) : (
                                        <Form.Item name="endDate" label="Bitmə tarixi">
                                            <DatePicker
                                                inputReadOnly={true}
                                                style={{
                                                    width: "100%",
                                                }}
                                                format="DD-MM-YYYY"
                                            />
                                        </Form.Item>
                                    )
                                }
                            </Form.Item>
                        )}

                        {/*<Form.Item name="fullName" label="Tam ad">*/}
                        {/*    <Input placeholder="tam ad" />*/}
                        {/*</Form.Item>*/}
                        {/*<Form.Item name="phone" label="Telefon">*/}
                        {/*    <Input placeholder="telefon" />*/}
                        {/*</Form.Item>*/}
                        {/*<Form.Item*/}
                        {/*    name="userId"*/}
                        {/*    label="Mülk sahibi"*/}
                        {/*    // rules={[*/}
                        {/*    //     {*/}
                        {/*    //         required: true,*/}
                        {/*    //         message: "mülk sahibi boş ola bilməz",*/}
                        {/*    //     },*/}
                        {/*    // ]}*/}
                        {/*>*/}
                        {/*    <Select*/}
                        {/*        placeholder="mülk sahibi seçin"*/}
                        {/*        optionFilterProp="children"*/}
                        {/*        showSearch*/}
                        {/*    >*/}
                        {/*        <Option value="">Heç biri</Option>*/}
                        {/*        {allUserContactAccess?.map((opt) => (*/}
                        {/*            <Option key={opt.userId} value={opt.userId}>*/}
                        {/*                {opt.fullName}*/}
                        {/*            </Option>*/}
                        {/*        ))}*/}
                        {/*    </Select>*/}
                        {/*</Form.Item>*/}
                        <Form.Item
                          name="selectManually"
                          valuePropName="checked"
                          initialValue={false}
                        >
                          <Checkbox>Manual seç</Checkbox>
                        </Form.Item>
                        <Form.Item
                          noStyle
                          shouldUpdate={(prevValues, currentValues) =>
                            prevValues.selectManually !== null
                          }
                        >
                          {({ getFieldValue }) =>
                            getFieldValue("selectManually") === false ? (
                                <Form.Item
                                    name="userId"
                                    label="Mülk sahibi"
                                >
                                    <Select
                                    placeholder="mülk sahibi seçin"
                                    optionFilterProp="children"
                                    showSearch
                                    >
                                    <Option value="">Heç biri</Option>
                                    {allUserContactAccess?.map((opt) => (
                                        <Option
                                        key={opt.userId}
                                        value={opt.userId}
                                        >
                                        {opt.fullName}
                                        </Option>
                                    ))}
                                    </Select>
                                </Form.Item>

                            ) : (
                              <>
                                <Form.Item name="fullName" label="Tam ad">
                                  <Input placeholder="tam ad" />
                                </Form.Item>
                                <Form.Item name="phone" label="Telefon">
                                  <Input placeholder="telefon" />
                                </Form.Item>
                              </>
                            )
                          }
                        </Form.Item>
                        <Form.Item name="contractAmount" label="Məbləq">
                            <Input placeholder="məbləq" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default ContractCrudForm;
