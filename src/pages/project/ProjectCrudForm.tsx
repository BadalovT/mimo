import { Col, Form, FormInstance, Input, Row } from "antd";
import React from "react";

type Type = {
  form: FormInstance<any>;
  mode: string;
};

const ProjectCrudForm = ({ form, mode }: Type) => {
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
              <Input />
            </Form.Item>
            <Form.Item name="adress" label="Adres">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ProjectCrudForm;
