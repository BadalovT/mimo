import React from "react";
import { Layout } from "antd";
import { changeCollapsed, changeMenuOpen } from "../../../redux/actions/navbar";
import { CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import SideBarMenuItem from "../menuItem/SideBarMenuItem";
import logo from "../../../assets/image/logo/logo.svg";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";

const { Sider } = Layout;

const DashboardSider = () => {
  const dispatch = useAppDispatch();

  const collapsed = useAppSelector(
    (state) => state.NavbarReducer.collapsed.val
  );
  const menuOpen = useAppSelector((state) => state.NavbarReducer.menuOpen.val);

  const toggle = () => {
    dispatch(changeCollapsed(!collapsed));
    dispatch(changeMenuOpen(!menuOpen));
  };
  // console.log(menuOpen);
  return (
    <Sider
      theme="light"
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={250}
      // breakpoint="lg"
      // collapsedWidth="0"
      // onBreakpoint={broken => {
      //   console.log(broken);
      // }}
      // onCollapse={(collapsed, type) => {
      //   console.log(collapsed, type);
      // }}
      className={
        menuOpen
          ? "site-layout-background main-menu menu-shadow  menu-open"
          : "site-layout-background main-menu menu-shadow hide"
      }
      style={{
        // overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 999,
      }}
    >
      <PerfectScrollbar
        className="main-menu-content"
        options={{ wheelPropagation: false }}
      >
        <div className="sidebar-header">
          <ul>
            <li className="nav-item me-auto">
              <Link to="/home">
                <div className="logo">
                  <img src={logo} alt="" />
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <div className="nav-toggle">
                <CloseOutlined
                  style={{ color: "#7367f0" }}
                  onClick={toggle}
                ></CloseOutlined>
              </div>
            </li>
          </ul>
        </div>

        <SideBarMenuItem />
      </PerfectScrollbar>
    </Sider>
  );
};

export default DashboardSider;
