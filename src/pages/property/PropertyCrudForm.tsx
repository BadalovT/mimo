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
  PropertyTypeRes,
  RoomRes,
  StateRes,
  TenantTypeRes,
} from "../../types/lookUpType";

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
}: Type) => {
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
            <Form.Item name="rentPrice" label="Kiraye Mebleği">
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Kiraye Meblegi"
              />
            </Form.Item>
            <Form.Item name="area" label="Sahə">
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Kiraye Meblegi"
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

            <Form.Item name="propertyTypeId" label="Mülk növü">
              <Select
                placeholder="Mülk növü seçin"
                optionFilterProp="children"
                showSearch
              >
                <Option value={0}>Heç biri</Option>
                {allPropertyType?.map((opt) => (
                  <Option key={opt.key} value={opt.key}>
                    {opt.name}
                  </Option>
                ))}
              </Select>
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
            <Form.Item name="cityId" label="Şəhər">
              <Select
                placeholder="Şəhər seçin"
                optionFilterProp="children"
                showSearch
              >
                <Option value={0}>Heç biri</Option>
                {allCity?.map((opt) => (
                  <Option key={opt.key} value={opt.key}>
                    {opt.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="stateId" label="Rayon">
              <Select
                placeholder="Rayon seçin"
                optionFilterProp="children"
                showSearch
              >
                <Option value={0}>Heç biri</Option>
                {allState?.map((opt) => (
                  <Option key={opt.key} value={opt.key}>
                    {opt.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="metroId" label="Metro">
              <Select
                placeholder="Metro seçin"
                optionFilterProp="children"
                showSearch
              >
                <Option value={0}>Heç biri</Option>
                {allMetro?.map((opt) => (
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

            <Form.Item name="address" label="Address">
              <Input placeholder="address" />
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
