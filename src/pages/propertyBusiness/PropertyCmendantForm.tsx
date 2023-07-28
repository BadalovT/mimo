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

const PropertyComendantForm = ({
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
            <Form.Item name="comendantPrice" label="Komendant Mebleği">
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Komendant Meblegi"
              />
            </Form.Item>
            <Form.Item
                name="communalActive"
                label="Komendant aktiv"
                valuePropName="checked"
                initialValue={false}
            >
              <Switch checkedChildren="aktiv" unCheckedChildren="deaktiv" />
            </Form.Item>






          </Col>
        </Row>
      </Form>
    </>
  );
};

export default PropertyComendantForm;
