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
  MetroRes, ProjectRes,
  PropertyTypeRes,
  RoomRes,
  StateRes,
  TenantTypeRes,
} from "../../types/lookUpType";

type Type = {
  form: FormInstance<any>;
  mode: string;
};
const { Option } = Select;

const PropertyPriceForm = ({
  form,
  mode,
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
            <Form.Item name="salesPrice" label="Satış Mebleği">
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Satış Meblegi"
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


          </Col>
        </Row>
      </Form>
    </>
  );
};

export default PropertyPriceForm
