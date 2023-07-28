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

type Type = {
  form: FormInstance<any>;
  mode: string;
  //   allTenant: tenantItem[];
};

const { Option } = Select;
const { TextArea } = Input;

const UserCrudForm = ({ form, mode }: Type) => {
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
              name="fullName"
              label="Tam ad"
              rules={[
                {
                  required: true,
                  message: "tam ad ola bilməz",
                },
              ]}
            >
              <Input placeholder="tam ad" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Nömrə"
              rules={[
                {
                  required: true,
                  message: "telefon ola bilməz",
                },
              ]}
            >
              <Input style={{ width: "100%" }} placeholder="nömrə" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "email ola bilməz",
                },
                { type: "email", message: "email formatı düzgün deyil" },
              ]}
            >
              <Input placeholder="email" />
            </Form.Item>

            {mode === "update" ? (
              <Form.Item
                label="Status"
                name="status"
                valuePropName="checked"
                initialValue={false}
              >
                <Switch checkedChildren="bəli" unCheckedChildren="xeyr" />
              </Form.Item>
            ) : null}

            <Form.Item name="description" label="Açıqlama">
              <TextArea
                placeholder="açıqlama"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default UserCrudForm;
