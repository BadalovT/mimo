import { Col, Form, FormInstance, Input, Row, Select, InputNumber } from "antd";
import React from "react";
import { getAllProjectItem } from "../../types/project";

type Type = {
  form: FormInstance<any>;
  allProject: getAllProjectItem[];
};

const { Option } = Select;

const CarCrudForm = ({ form, allProject }: Type) => {
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
              name="carNumber"
              label="Avtomobil nömrəsi"
              rules={[
                {
                  required: true,
                  message: "avtomobil nömrəsi boş ola bilməz",
                },
              ]}
            >
              <Input placeholder="avtomobil nömrəsi" />
            </Form.Item>
            <Form.Item
              name="projectId"
              label="Layihə"
              // rules={[
              //   {
              //     required: true,
              //     message: "tenant növü boş ola bilməz",
              //   },
              // ]}
            >
              <Select
                placeholder="layihə növü seçin"
                optionFilterProp="children"
                showSearch
              >
                <Option value="">Heç biri</Option>
                {allProject?.map((opt) => (
                  <Option key={opt.key} value={opt.key}>
                    {opt.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="fullName" label="Tam ad">
              <Input placeholder="tam ad" />
            </Form.Item>

            <Form.Item name="phone" label="Telefon">
              <Input placeholder="telefon" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default CarCrudForm;
