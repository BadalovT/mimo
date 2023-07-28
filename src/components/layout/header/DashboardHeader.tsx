import React from "react";
import "antd/dist/reset.css";
import { Layout } from "antd";
import { Row, Col } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { changeCollapsed } from "../../../redux/actions/navbar";
import { changeMenuOpen } from "../../../redux/actions/navbar";
import UserDropdown from "../userDropdown/UserDropdown";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
const { Header } = Layout;
const DashboardHeader = () => {
  const dispatch = useAppDispatch();

  const collapsed = useAppSelector(
    (state) => state.NavbarReducer.collapsed.val
  );
  const menuOpen = useAppSelector((state) => state.NavbarReducer.menuOpen.val);

  const toggle = () => {
    dispatch(changeCollapsed(!collapsed));
    dispatch(changeMenuOpen(!menuOpen));
  };
  return (
    <Header
      className={
        collapsed
          ? "site-layout-background header-navbar navbar-shadow "
          : "site-layout-background header-navbar navbar-shadow floating-nav "
      }
      style={{ overflow: "initial" }}
    >
      <Row justify="space-between">
        <Col span={6}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
        </Col>
        <Col
          className="DropDownPosition"
          span={6}
          style={{ display: "contents" }}
        >
          <UserDropdown />
        </Col>
      </Row>
    </Header>
  );
};

export default DashboardHeader;
