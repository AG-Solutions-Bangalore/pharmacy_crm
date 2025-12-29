import Login from "@/app/auth/login";
// import CreateCompany from "@/app/company/create-company";
// import EditCompany from "@/app/company/edit-company";
import BagTypeList from "@/app/bagtype/bagtype-list";
import BankList from "@/app/bank/bank-list";
import BuyerList from "@/app/buyer/buyer-list";
import ContainerSizeList from "@/app/containersize/containersize-list";
import CountryList from "@/app/country/country-list";
import NotFound from "@/app/errors/not-found";
import GrCodeList from "@/app/grcode/grcode-list";
import Home from "@/app/home/home";
import CreateButton from "@/app/usermanagement/usermanagement-create-button";
import CreatePage from "@/app/usermanagement/usermanagement-create-page";
import ManagementDashboard from "@/app/usermanagement/usermanagement-dashboard";
import UserManagementList from "@/app/usermanagement/usermanagement-list";
import Maintenance from "@/components/common/maintenance";
import ErrorBoundary from "@/components/error-boundry/error-boundry";
import LoadingBar from "@/components/loader/loading-bar";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AuthRoute from "./auth-route";
import ProtectedRoute from "./protected-route";
import UserTypeList from "@/app/usertype/usertype-list";
import EditUserType from "@/app/usertype/usertype-edit";

function AppRoutes() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<AuthRoute />}>
          <Route path="/" element={<Login />} />
          {/* <Route
            path="/forgot-password"
            element={
              <Suspense fallback={<LoadingBar />}>
                <ForgotPassword />
              </Suspense>
            }
          /> */}
          <Route path="/maintenance" element={<Maintenance />} />
        </Route>

        <Route path="/" element={<ProtectedRoute />}>
          <Route
            path="/user-type"
            element={
              <Suspense fallback={<LoadingBar />}>
                <UserTypeList />
              </Suspense>
            }
          />
          <Route
            path="/edit-user-type/:id"
            element={
              <Suspense fallback={<LoadingBar />}>
                <EditUserType />
              </Suspense>
            }
          />
          <Route
            path="/userManagement"
            element={
              <Suspense fallback={<LoadingBar />}>
                <UserManagementList />
              </Suspense>
            }
          />
          <Route
            path="/page-management"
            element={
              <Suspense fallback={<LoadingBar />}>
                <CreatePage />
              </Suspense>
            }
          />
          <Route
            path="/button-management"
            element={
              <Suspense fallback={<LoadingBar />}>
                <CreateButton />
              </Suspense>
            }
          />
          <Route
            path="/management-dashboard/:id"
            element={
              <Suspense fallback={<LoadingBar />}>
                <ManagementDashboard />
              </Suspense>
            }
          />
          <Route
            path="/home"
            element={
              <Suspense fallback={<LoadingBar />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/buyer"
            element={
              <Suspense fallback={<LoadingBar />}>
                <BuyerList />
              </Suspense>
            }
          />
          <Route
            path="/master/bag-type"
            element={
              <Suspense fallback={<LoadingBar />}>
                <BagTypeList />
              </Suspense>
            }
          />
          <Route
            path="/master/bank"
            element={
              <Suspense fallback={<LoadingBar />}>
                <BankList />
              </Suspense>
            }
          />
          <Route
            path="/master/containersize"
            element={
              <Suspense fallback={<LoadingBar />}>
                <ContainerSizeList />
              </Suspense>
            }
          />
          <Route
            path="/master/country"
            element={
              <Suspense fallback={<LoadingBar />}>
                <CountryList />
              </Suspense>
            }
          />
          <Route
            path="/master/grcode"
            element={
              <Suspense fallback={<LoadingBar />}>
                <GrCodeList />
              </Suspense>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default AppRoutes;
