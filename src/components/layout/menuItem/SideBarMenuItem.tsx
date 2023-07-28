import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
  ContainerOutlined, CreditCardOutlined,
  PieChartOutlined,
  UserOutlined,ProjectOutlined,ScheduleOutlined,CarOutlined,HomeOutlined, BankOutlined,UserSwitchOutlined,FileTextOutlined,DollarCircleOutlined
} from "@ant-design/icons";

import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
const SideBarMenuItem = () => {
  let href = window.location.href.split("/");
  const activeUrl = href[3];

  const items: MenuProps["items"] = [
    {
      label: <Link to="project">Layihə</Link>,
      key: "project",
      icon: <ProjectOutlined style={{ fontSize: "20px" }} />,
    },
    {
      label: <Link to="plan">Plan</Link>,
      key: "plan",
      icon: <ScheduleOutlined style={{ fontSize: "20px" }} />,
    },
    {
      label: <Link to="car">Avtomobil</Link>,
      key: "car",
      icon: <CarOutlined style={{ fontSize: "20px" }} />,
    },
    {
      label: <Link to="role">Role</Link>,
      key: "role",
      icon: <UserSwitchOutlined style={{ fontSize: "20px" }} />,
    },
    {
      label: <Link to="tenant">Tenant</Link>,
      key: "tenant",
      icon: <BankOutlined style={{ fontSize: "20px" }} />,
    },
    {
      label: <Link to="property">Mülk</Link>,
      key: "property",
      icon: <HomeOutlined style={{ fontSize: "20px" }} />,
    },
    {
      label: <Link to="propertyBusiness">Mülk</Link>,
      key: "propertyBusiness",
      icon: <HomeOutlined style={{ fontSize: "20px" }} />,
    },
    {
      label: <Link to="propertyReiltor">Mülk</Link>,
      key: "propertyReiltor",
      icon: <HomeOutlined style={{ fontSize: "20px" }} />,
    },
    {
      label: <Link to="user">İstifadəçi</Link>,
      key: "user",
      icon: <UserOutlined style={{ fontSize: "20px" }} />,
    },
    {
      label: <Link to="contract">Müqavilə</Link>,
      key: "contract",
      icon: <FileTextOutlined style={{ fontSize: "20px" }} />,
    },
    {
      label: <Link to="payment">Ödəniş</Link>,
      key: "payment",
      icon: <DollarCircleOutlined  style={{ fontSize: "20px" }} />,
    },
    {
      label: <Link to="paymentBusiness">Ödəniş</Link>,
      key: "paymentBusiness",
      icon: <DollarCircleOutlined  style={{ fontSize: "20px" }} />,
    },
    {
      label: <Link to="contractBusiness">Biznes müqavilə</Link>,
      key: "contractBusiness",
      icon: <FileTextOutlined  style={{ fontSize: "20px" }} />,
    },
  ];

  return (
    <Menu
      className="sidebar-menu"
      defaultSelectedKeys={[activeUrl]}
      mode="inline"
      theme="light"
      items={items}
    />
  );
};

export default SideBarMenuItem;
