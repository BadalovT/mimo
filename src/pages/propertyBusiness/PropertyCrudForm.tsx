import {
  Col,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  InputNumber,
  Switch,
} from "antd";
import React from "react";
import {
  BlockRes,
  CityRes,
  FloorRes,
  MetroRes,
  // ProjectRes,
  // PropertyTypeRes,
  RoomRes,
  StateRes,
  TenantTypeRes,
} from "../../types/lookUpType";
import {PropertyTypeRes} from "../../types/userPropertyType";
import {getAllProjectItem} from "../../types/userProject";

type Type = {
  form: FormInstance<any>;
  mode: string;
  allTenantType: TenantTypeRes[];
  allPropertyType: PropertyTypeRes[];
  allBlock: BlockRes[];
  allCity: CityRes[];
  allState: StateRes[];
  allMetro: MetroRes[];
  allFloor: FloorRes[];
  allRoom: RoomRes[];
  allProject: getAllProjectItem[];
  values: any;
};
const { Option } = Select;

const PropertyCrudForm = ({
  form,
  mode,
  allTenantType,
  allPropertyType,
  allBlock,
  allCity,
  allMetro,
  allState,
  allRoom,
  allFloor,
    allProject,
    values,
}: Type) => {
  {console.log(values?.projectId, "values?.projectId")}
  const validateInput = (_ :any, value: any) => {
    if (value === 0) {
      return Promise.reject('Field is required.');
    }
    return Promise.resolve();
  };
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
              name="name"
              label="Ad"
              rules={[
                {
                  required: true,
                  message: "ad boş ola bilməz",
                },
              ]}
            >
              <Input placeholder="ad" />
            </Form.Item>
            <Form.Item name="rentPrice" label="Kirayə məbləği">
              <InputNumber
                style={{ width: "100%" }}
                placeholder="kirayə məbləği"
              />
            </Form.Item>
            <Form.Item name="salesPrice" label="Satış məbləği">
              <InputNumber
                style={{ width: "100%" }}
                placeholder="satış məbləği"
              />
            </Form.Item>
            <Form.Item name="comendantPrice" label="Komendant məbləği">
              <InputNumber
                style={{ width: "100%" }}
                placeholder="komendant məbləği"
              />
            </Form.Item>
            <Form.Item name="area" label="Sahə">
              <InputNumber
                style={{ width: "100%" }}
                placeholder="sahə"
              />
            </Form.Item>
            <Form.Item
              name="rentStatus"
              label="Kirayə Statusu"
              valuePropName="checked"
              initialValue={false}
            >
              <Switch checkedChildren="bəli" unCheckedChildren="xeyr" />
            </Form.Item>
            <Form.Item
              name="salesStatus"
              label="Satış Statusu"
              valuePropName="checked"
              initialValue={false}
            >
              <Switch checkedChildren="bəli" unCheckedChildren="xeyr" />
            </Form.Item>

            <Form.Item name="projectId" label="Layihə adı" rules={[
                {
                    validator: validateInput,
                  required: true,
                  message: "Layihə boş ola bilməz",
                },
            ]}>
              <Select
                placeholder="Layihə seçin"
                optionFilterProp="children"
                showSearch
              >
                <Option value={0}>Heç biri</Option>
                {allProject?.map((opt) => (
                  <Option key={opt.key} value={opt.key}>
                    {opt.projectName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="propertyTypeId" label="Mülk növü"
                       rules={[
                         {
                           validator: validateInput,
                           required: true,
                           message: "Mülk boş ola bilməz",
                         },
                       ]}
            >
              <Select
                placeholder="Mülk növü seçin"
                optionFilterProp="children"
                showSearch
              >
                <Option value={0}>Heç biri</Option>
                {allPropertyType?.map((opt) => (
                  <Option key={opt.key} value={opt.key}>
                    {opt.propertyTypeName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
                name="communalActive"
                label="Komendant aktiv"
                valuePropName="checked"
                initialValue={false}
            >
              <Switch checkedChildren="aktiv" unCheckedChildren="deaktiv" />
            </Form.Item>
            <Form.Item name="blockId" label="Blok">
              <Select
                placeholder="Blok seçin"
                optionFilterProp="children"
                showSearch
              >
                <Option value={0}>Heç biri</Option>
                {allBlock?.map((opt) => (
                  <Option key={opt.key} value={opt.key}>
                    {opt.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="floorId" label="Mərtəbə">
              <Select
                placeholder="Mərtəbə seçin"
                optionFilterProp="children"
                showSearch
              >
                <Option value={0}>Heç biri</Option>
                {allFloor?.map((opt) => (
                  <Option key={opt.key} value={opt.key}>
                    {opt.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="roomId" label="Otaq">
              <Select
                placeholder="Otaq seçin"
                optionFilterProp="children"
                showSearch
              >
                <Option value={0}>Heç biri</Option>
                {allRoom?.map((opt) => (
                  <Option key={opt.key} value={opt.key}>
                    {opt.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="isRepair"
              label="Vəziyyəti"
              valuePropName="checked"
              initialValue={false}
            >
              <Switch checkedChildren="təmirli" unCheckedChildren="təmirsiz" />
            </Form.Item>

            <Form.Item name="address" label="Adres">
              <Input placeholder="adres" />
            </Form.Item>
            <Form.Item name="description" label="Açıqlama">
              <Input placeholder="Açıqlama" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default PropertyCrudForm;
