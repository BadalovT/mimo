import {
  Col,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  InputNumber,
  Switch,
  DatePicker, Spin, Button,
} from "antd";
import React, {useEffect, useState} from "react";
import { MonthRes,
  PaymentTypeRes,
  TenantTypeRes,
} from "../../types/lookUpType";
import AsyncSelect from "./AsyncSelect";
import {allContractItem} from "../../types/contract";
import axios from "axios";

type Type = {
  form: FormInstance<any>;
  mode: string;
  allTenantType: TenantTypeRes[];
  allPaymentType: PaymentTypeRes[];
  allMonth: MonthRes[];
  allContract: allContractItem[];
};
const { Option } = Select;

interface OptionType {
  value: string;
  label: string;
}

const PaymentCrudForm = ({
  form,
  mode,
  allTenantType,
  allPaymentType,
    allMonth,
    allContract
}: Type) => {
  const [options, setOptions] = useState<OptionType[]>();
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<object | undefined>(undefined); // add state for selected value

  const handleSearch = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`https://apitest.mimo.az/api/BusinessContract/GetByContractNo/${searchValue}`);
      const data = response.data;

      const options = [{
        value: data.key,
        label: data.contractNo,
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
          <Form.Item name="businessContractId" label="Müqavilə" rules={[{ required: true }]}>
            <Select
                showSearch
                loading={loading}
                onSearch={handleInputChange}
                placeholder={loading ? 'Loading...' : 'Müqaviləni seçin'}
                options={options}
                open={open}
                onDropdownVisibleChange={handleDropdownVisibleChange}
                onBlur={() => setOpen(false)}
                filterOption={false}
                notFoundContent={loading ? <Spin size="small" /> : 'Müqavilə tapılmadı'}
                style={{ width: 200 }}
                onChange={(value, option) => form.setFieldsValue({ businessContractId: value })} // update the form field value
                value={form.getFieldValue("businessContractId")} // get the field value from the form
            />
            <Button type="primary" onClick={handleSearch} style={{ marginRight: 8 }}>
              Axtar
            </Button>
            <Button onClick={handleClear}>Təmizlə</Button>
          </Form.Item>
          <Form.Item name="monthId" label="Aylar" rules={[{ required: true }]}>
            <Select
                placeholder="Aylar seçin"
                optionFilterProp="children"
                showSearch
                mode={'multiple'}
            >
              <Option value={0}>Heç biri</Option>
              {allMonth?.map((opt) => (
                  <Option key={opt.key} value={opt.key}>
                    {opt.name}
                  </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="paymentAmount" label="Ödəniş məbləği" rules={[{ required: true }]}>
            <Input type="number" placeholder="Ödəniş məbləği seçin"/>
          </Form.Item>
          <Form.Item name="PaymentDate" label="Ödəniş tarixi" rules={[{ required: true }]}>
            <DatePicker placeholder="Ödəniş tarixi seçin" />
          </Form.Item>
          <Form.Item name="paymentTypeId" label="Ödəniş tipi" rules={[{ required: true }]}>
            <Select
                placeholder="Ödəniş tipi seçin"
                optionFilterProp="children"
                showSearch
            >
              <Option value={0}>Heç biri</Option>
              {allPaymentType?.map((opt) => (
                  <Option key={opt.key} value={opt.key}>
                    {opt.name}
                  </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="year" label="İl" rules={[{ required: true }]}>
            <DatePicker picker="year"/>
          </Form.Item>
          <Form.Item name="description" label="Ətraflı" >
            <Input type="textArea" placeholder="Ətraflı yazın" />
          </Form.Item>

      </Form>
    </>
  );
};

export default PaymentCrudForm;
