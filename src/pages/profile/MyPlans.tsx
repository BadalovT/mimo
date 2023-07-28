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
  getAllUserContactAccess
} from "../../redux/store/features/userContactAccessSlice";
import MyContactsPage from "./MyContactsPage";
import MyBusinessContracts from "./MyBusinessContracts"
import {filterState} from "../../types/property";
import TenantPlanByUser from "./TenantPlanByUser";
import PlanListByTenant from "./PlanListByTenant";

const { TabPane } = Tabs;
const MyPlans = () => {

  const dispatch = useAppDispatch();
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [obj, setObj] = useState<filterState | {}>({});
  useEffect(() => {
    // dispatch(getAllUserPaging({ page: 0, pageSize: 10, obj: {} }));
  }, []);


  const handleTabChange = (key: string) => {
    // console.log('Selected tab:', key);
  };


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
      <FullWidthCard>

        <Card>
            <Tabs
                defaultActiveKey="1"
                items={[
                  {
                    label: 'Sistemde hal hazırki plan',
                    key: '1',
                    children: <TenantPlanByUser/>,
                  },
                  {
                    label: 'Plan siyahısı',
                    key: '2',
                    children: <PlanListByTenant/>,
                  },
                ]}
            />
        </Card>
        </FullWidthCard>
    </>
  );
};

export default MyPlans;
