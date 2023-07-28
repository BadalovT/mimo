import React, { useEffect, useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import signInFoto from "../../assets/image/background/signIn.svg";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { RegisterForm } from "../../types/auth";
import { getTenantType } from "../../redux/store/features/lookUpSlice";
import { postRegister } from "../../redux/store/features/authSlice";
import {showSuccess} from "../../utils/showMessage";
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";


const { Option } = Select;

export default function Register() {
  const theme = createTheme();

  const dispatch = useAppDispatch();

  const { allTenantType } = useAppSelector((state) => state.lookUpSlice);

  useEffect(() => {
    dispatch(getTenantType());
  }, []);
  const navigate = useNavigate();

  const onFinish = (values: RegisterForm) => {
    dispatch(postRegister(values)).then((res:any) => {
      res.payload?.detail && showSuccess(res.payload?.detail);
        navigate("/sign-in")
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={8}
          sx={{
            //   'url(https://source.unsplash.com/random)'
            backgroundImage: "url(" + signInFoto + ")",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t: any) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "auto", //cover
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={4}
          sx={{
            //   display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Form
              style={{ width: "100%" }}
              name="basic"
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="Tam ad"
                name="fullName"
                rules={[{ required: true, message: "tam ad boş ola bilməz!" }]}
              >
                <Input placeholder="tam ad" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "email boş ola bilməz!" }]}
              >
                <Input placeholder="email" />
              </Form.Item>

              <Form.Item
                label="Telefon"
                name="phone"
                rules={[{ required: true, message: "telefon boş ola bilməz!" }]}
              >
                <Input placeholder="telefon" />
              </Form.Item>

              <Form.Item
                name="tenantTypeId"
                label="Şirkət növü"
                rules={[
                  {
                    required: true,
                    message: "şirkət növü",
                  },
                ]}
              >
                <Select
                  placeholder="şirkət növü növü seçin"
                  optionFilterProp="children"
                  showSearch
                  style={{ width: "100%" }}
                >
                  {allTenantType?.map((opt) => (
                    <Option key={opt.key} value={opt.key}>
                      {opt.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.endDate !== null
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue("tenantTypeId") === 2 ||
                  getFieldValue("tenantTypeId") === 3 ? (
                    <Form.Item
                      label="Şirkət adı"
                      name="tenantName"
                      rules={[
                        {
                          required: true,
                          message: "şirkət adı boş ola bilməz!",
                        },
                      ]}
                    >
                      <Input placeholder="şirkət adı" />
                    </Form.Item>
                  ) : null
                }
              </Form.Item>


              <Grid container>
                <Grid item xs>
                  <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      style={{ letterSpacing: "1.5px" }}
                  >
                    QEYDIYYATDAN KEÇ
                  </Button>
                </Grid>
                <Grid item>
                  <Link to="/sign-in">
                    {"Login"}
                  </Link>
                </Grid>
              </Grid>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>


              </Form.Item>
            </Form>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
