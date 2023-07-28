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
            >
              <Input placeholder="ad"  disabled/>
            </Form.Item>
            <Form.Item
              name="blockName"
              label="Blok Adı"
            >
              <Input placeholder="Blok Adı" disabled/>
            </Form.Item>
            <Form.Item name="area" label="Sahə">
              <Input
                style={{ width: "100%" }}
                placeholder="Kiraye Meblegi"
                disabled
              />
            </Form.Item>
            <Form.Item name="comendantPrice" label="Komendant haqqı">
              <Input
                style={{ width: "100%" }}
                placeholder="Komendant haqqı"
                disabled
              />
            </Form.Item>
            <Form.Item
                name="blockName"
                label="Blok Adı"
            >
              <Input placeholder="Blok Adı" disabled/>
            </Form.Item>
            <Form.Item
                name="floorName"
                label="Mərtəbə Adı"
            >
              <Input placeholder="Mərtəbə Adı" disabled/>
            </Form.Item>
            <Form.Item
                name="roomName"
                label="Otaq Adı"
            >
              <Input placeholder="Otaq Adı" disabled/>
            </Form.Item>
            <Form.Item
                name="projectName"
                label="Layihə Adı"
            >
              <Input placeholder="Layihə Adı" disabled/>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default PropertyCrudForm;
