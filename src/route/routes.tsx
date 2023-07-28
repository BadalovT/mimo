import { RouteObject } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Car from "../pages/car/Car";
import Dashboard from "../pages/homePage/HomePage";
import PlanPage from "../pages/plan/PlanPage";
import ProjectPage from "../pages/project/ProjectPage";
import Register from "../pages/register/Register";
import Role from "../pages/role/RolePage";
import SignIn from "../pages/signIn/SignIn";
import TenantPage from "../pages/tenant/TenantPage";
import PrivateRoute from "./PrivateRoute";
import Property from "../pages/property/PropertyPage";
import PropertyBusines from "../pages/propertyBusiness/PropertyPage";
import FilterProvider from "../pages/property/context/FilterProvider";
import FilterProviderBusiness from "../pages/propertyBusiness/context/FilterProvider";
import UserPage from "../pages/user/UserPage";
import ContractPage from "../pages/conract/ContractPage";
import FilterProviderRieltor from "../pages/propertyRieltor/context/FilterProvider";
import PropertyRieltor from "../pages/propertyRieltor/PropertyPage";
import PaymentPage from "../pages/payment/PaymentPage";
import ContractBusiness from "../pages/conractBusiness/ContractPage";
import ContractFilterProvider from "../pages/conract/context/FilterProvider";
import PaymentFilterProvider from "../pages/payment/context/FilterProvider";
import PaymentBusinessFilterProvider from "../pages/paymentBusiness/context/FilterProvider";
import PaymentBusiness from "../pages/paymentBusiness/PaymentPage";
import ProfilePage from "../pages/profile/ProfilePage";
import ForgotPassword from "../pages/register/ForgotPassword";

type PermissionRoute1 = RouteObject & { permissionKey?: string };

type PermissionRoute1Child = PermissionRoute1 & {
  children?: PermissionRoute1[];
};

// interface PermissionRoute extends RouteObject {
//   permissionKey: string;
// }

const routes: PermissionRoute1Child[] = [
  {
    path: "sign-in",
    element: <SignIn />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        // element: <Car />,
      },
      {
        path: "project",
        element: <ProjectPage />,
        permissionKey: "project",
      },
      {
        path: "plan",
        element: <PlanPage />,
        permissionKey: "plan",
      },
      {
        path: "car",
        element: <Car />,
        permissionKey: "car",
      },
      {
        path: "role",
        element: <Role />,
        permissionKey: "role",
      },
      {
        path: "tenant",
        element: <TenantPage />,
        permissionKey: "tenant",
      },
      {
        path: "property",
        element: (
          <FilterProvider>
            <Property />
          </FilterProvider>
        ),
        permissionKey: "property",
      },
      {
        path: "propertyBusiness",
        element: (
          <FilterProviderBusiness>
            <PropertyBusines />
          </FilterProviderBusiness>
        ),
        permissionKey: "propertyBusiness",
      },
      {
        path: "propertyReiltor",
        element: (
          <FilterProviderRieltor>
            <PropertyRieltor />
          </FilterProviderRieltor>
        ),
        permissionKey: "propertyReiltor",
      },
      {
        path: "user",
        element: <UserPage />,
        permissionKey: "user",
      },
      {
        path: "payment",
        element:(<PaymentFilterProvider><PaymentPage /></PaymentFilterProvider> ),
        permissionKey: "payment",
      },
      {
        path: "paymentBusiness",
        element:(<PaymentBusinessFilterProvider><PaymentBusiness/></PaymentBusinessFilterProvider> ),
        permissionKey: "paymentBusiness",
      },
      {
        path: "contract",
        element:
        (<ContractFilterProvider>
            <ContractPage />
        </ContractFilterProvider>),
        permissionKey: "contract",
      },
      {
        path: "contractBusiness",
        element: <ContractBusiness />,
        permissionKey: "contractBusiness",
      },
      {
        path: "profile",
        element: <ProfilePage/>,
        permissionKey: "profile",
      },
    ],
  },
];
export default routes;
