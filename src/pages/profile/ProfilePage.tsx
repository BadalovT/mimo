import {
  Button,
  Card,
  Col,
  Form,
  Pagination,
  Popconfirm,
  Popover,
  Row,
  Space,
  Switch,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
import FullWidthCard from "../../components/card/FullWidthCard";
import { Plus } from "react-feather";
import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { baseUrl } from "../../utils/url";
import { useAppDispatch, useAppSelector } from "../../redux/hook";

import CrudDrawer from "../../components/drawer/CrudDrawer";

import { getAccessToken } from "../../utils/token/getAccessClaims";

import { showDrawer, toggleModal } from "../../redux/store/features/userSlice";
// import UserCrudForm from "./UserCrudForm";
import {
  addUser,
  deleteUser,
  getAllUserPaging,
  getUserById,
  updateUser,
} from "../../redux/store/features/userSlice";
import { getAllUserItem } from "../../types/user";
import {
  getUserRoleById,
} from "../../redux/store/features/userRole";
import {
  getUserProjectById,
} from "../../redux/store/features/userProjectSlice";
import {
  getUserContractTypeById,
} from "../../redux/store/features/userContractTypeSlice";
import { addUserPropertyType, deleteUserPropertyType, getUserPropertyTypeById } from "../../redux/store/features/userPropertyTypeSlice";
import { Tabs } from 'antd';
import {
  getAllMyContactsByDynamic, getAllToReceiverByDynamic,
  getAllToSenderByDynamic,
    GetUserDetail,
  getAllUserContactAccess
} from "../../redux/store/features/userContactAccessSlice";
import MyContactsPage from "./MyContactsPage";
import MyBusinessContracts from "./MyBusinessContracts"
import {filterState} from "../../types/property";
import MyPlans from "./MyPlans";

const { TabPane } = Tabs;
const ProfilePage = () => {

  const dispatch = useAppDispatch();
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [obj, setObj] = useState<filterState | {}>({});
  useEffect(() => {
    // dispatch(getAllUserPaging({ page: 0, pageSize: 10, obj: {} }));
    dispatch(GetUserDetail());
  }, []);


  const handleTabChange = (key: string) => {
    // console.log('Selected tab:', key);
  };

  const {UserDetail} = useAppSelector((state) => state.userContactAccessSlice);



  const onChange = (key: string) => {
    if (key === "2") {
      dispatch(getAllToSenderByDynamic({
        page: 0,
        pageSize: pageSize,
        obj: obj,
      }));
    }   else if (key === "1") {
      dispatch(getAllMyContactsByDynamic({
        page: 0,
        pageSize: pageSize,
        obj: obj,
      }));
    }  else{
      dispatch(getAllToReceiverByDynamic({
        page: 0,
        pageSize: pageSize,
        obj: obj,
      }));
    }
  };


  return (
    <>
      <Row gutter={16}>
        <Col span={8} >
          <Card title={UserDetail.fullName}  bordered={false}>
            <p>Email: {UserDetail.email}</p>
            <p>Nömrə: {UserDetail.phone}</p>
          </Card>
        </Col>
        <Col span={16}>
          <Card  bordered={false}>
            <Tabs
                defaultActiveKey="1"
                items={[
                  {
                    label: 'Kontaktlar',
                    key: '1',
                    children: <MyContactsPage/>,
                  },
                  {
                    label: 'Muqavileler',
                    key: '2',
                    children: <MyBusinessContracts/>,
                  },
                  {
                    label: 'Planlar',
                    key: '3',
                    children: <MyPlans/>,
                  },
                ]}
            />

          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProfilePage;
