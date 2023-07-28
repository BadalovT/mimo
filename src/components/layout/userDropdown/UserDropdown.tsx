import React, {useEffect, useState} from "react";

import { Avatar } from "antd";
import "antd/dist/reset.css";
import type { MenuProps } from "antd";
import defaultAvatar from "../../../assets/image/avatar/avatar.png";
import { Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "../../../redux/hook";
import { triggerLogout } from "../../../redux/store/features/authSlice";
import {GetUserDetail} from "../../../redux/store/features/userContactAccessSlice";

const UserDropdown = () => {
  const dispatch = useAppDispatch();

  const [userData] = useState(null);

  const userAvatar = defaultAvatar;

  useEffect(() => {
    dispatch(GetUserDetail());
  }, []);


  const {UserDetail} = useAppSelector((state) => state.userContactAccessSlice);

  const onLogout = () => {
    const refreshTokenLocal = localStorage.getItem("mimoRefreshToken");

    if (refreshTokenLocal !== null) {
      const refreshTokenSend = {
        refreshToken: JSON.parse(refreshTokenLocal),
      };
      // console.log(refreshTokenSend)
      dispatch(triggerLogout(refreshTokenSend));
    }
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <Link to={"/profile"} style={{ color: "#6e84a3" }}>
          Şəxsi Kabinet
        </Link>
      ),
      key: "0",
      icon: <UserOutlined style={{ fontSize: "16px", color: "#6e84a3" }} />,
    },
    {
      key: "2",
      label: (
        <Link
          // onClick={onLogout}
          to={""}
          style={{ color: "#6e84a3" }}
          onClick={onLogout}
        >
          {" "}
          Çıxış et
        </Link>
      ),
      icon: <LogoutOutlined style={{ fontSize: "16px", color: "#6e84a3" }} />,
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]} placement="bottom" arrow>

        <Link
            to="profile"
          className="ant-dropdown-link mr-10"
        >
          <span className="user-name fw-bolder mr-10">
            {(UserDetail && UserDetail.fullName) || "John Doe"}
          </span>
          {/* <span className="user-status">
            {(userData && userData.role) || "Admin"}
          </span>{" "} */}
          <Avatar size="large" src={userAvatar} />
        </Link>
      </Dropdown>
    </>
  );
};

export default UserDropdown;
