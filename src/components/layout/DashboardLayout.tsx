import React from "react";
import "antd/dist/reset.css";
import "./index.css";
import { Layout } from "antd";
import DashboardSider from "./sider/DashboardSider";
import DashboardHeader from "./header/DashboardHeader";
import { Outlet } from "react-router-dom";
import { changeCollapsed, changeMenuOpen } from "../../redux/actions/navbar";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
const { Content } = Layout;

const DashboardLayout = () => {
  const dispatch = useAppDispatch();
  
  const collapsed = useAppSelector(
    (state) => state.NavbarReducer.collapsed.val
  );

  const menuOpen = useAppSelector((state) => state.NavbarReducer.menuOpen.val);
  const ChangeCollapse = () => {
    dispatch(changeCollapsed(!collapsed));
    dispatch(changeMenuOpen(!menuOpen));
  };
  return (
    <Layout>
      <DashboardSider />
      <Layout className="site-layout">
        <DashboardHeader />
        <Content
          className={
            collapsed
              ? "content app-content collapsedStyle"
              : "content app-content  uncollapsedStyle"
          }
        >
          <div className="header-navbar-shadow"></div>
          <Outlet />
        </Content>
      </Layout>
      <div
        onClick={ChangeCollapse}
        className={collapsed ? "sidenav-overlay d-none d-sm-block" : "sidenav-overlay show d-none d-sm-block"} //d-block d-md-none
      ></div>
    </Layout>
  );
};

export default DashboardLayout;
