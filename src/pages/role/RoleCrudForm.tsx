import { Col, Form, FormInstance, Input, Row, Select, InputNumber } from "antd";
import React from "react";
import { TenantTypeRes } from "../../types/lookUpType";

type Type = {
  form: FormInstance<any>;
  mode: string;
  allTenantType: TenantTypeRes[];
  
};

const { Option } = Select;

const RoleCrudForm = ({ form, mode, allTenantType }: Type) => {
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
            <Form.Item
              name="tenantTypeId"
              label="Tenant növü"
              // rules={[
              //   {
              //     required: true,
              //     message: "tenant növü boş ola bilməz",
              //   },
              // ]}
            >
              <Select
                placeholder="tenant növü növü seçin"
                optionFilterProp="children"
                showSearch
              >
                <Option value="">Heç biri</Option>
                {allTenantType?.map((opt) => (
                  <Option key={opt.key} value={opt.key}>
                    {opt.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
                name="description"
                label="Açıqlama"
                rules={[
                  {
                    required: true,
                    message: "Açıqlama boş ola bilməz",
                  },
                ]}
            >
              <Input placeholder="Açıqlama" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default RoleCrudForm;
