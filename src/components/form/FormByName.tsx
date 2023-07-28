import axios from "axios";
import { Button, Form, FormInstance, Input, Modal, Result } from "antd";

type Types = {
  form: FormInstance<any>;
  label:string
};

const FormByName = ({ form,label }: Types) => {
  return (
    <>
      <Form form={form} layout="vertical" autoComplete="off" size="large">
        <Form.Item
          name="name"
          label={label}
          rules={[
            {
              required: true,
              message: `${label} boş ola bilməz!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </>
  );
};
export default FormByName;
