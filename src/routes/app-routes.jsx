import Login from "@/app/auth/login";
// import CreateCompany from "@/app/company/create-company";
// import EditCompany from "@/app/company/edit-company";
import BagTypeList from "@/app/bagtype/bagtype-list";
import BankList from "@/app/bank/bank-list";
import BranchList from "@/app/branch/branch-list";
import BuyerList from "@/app/buyer/buyer-list";
import ContainerSizeList from "@/app/containersize/containersize-list";
import CountryList from "@/app/country/country-list";
import NotFound from "@/app/errors/not-found";
import GrCodeList from "@/app/grcode/grcode-list";
import Home from "@/app/home/home";
import MarkingList from "@/app/marking/marking-list";
import OrderTypeList from "@/app/ordertype/ordertype-list";
import PaymentTermList from "@/app/payementterm/paymentterm-list";
import PortofList from "@/app/portofloading/portofloading-list";
import PreRecepitList from "@/app/prereceipts/prereceipts-list";
import ProductList from "@/app/product/product-list";
import SchemeList from "@/app/scheme/scheme-list";
import Settings from "@/app/setting/setting";
import ShipperList from "@/app/shipper/shipper-list";
import StateList from "@/app/state/state-list";
import CreateButton from "@/app/usermanagement/usermanagement-create-button";
import CreatePage from "@/app/usermanagement/usermanagement-create-page";
import ManagementDashboard from "@/app/usermanagement/usermanagement-dashboard";
import UserManagementList from "@/app/usermanagement/usermanagement-list";
import EditUserType from "@/app/usertype/usertype-edit";
import UserTypeList from "@/app/usertype/usertype-list";
import VesselList from "@/app/vessel/vessel-list";
import Maintenance from "@/components/common/maintenance";
import ErrorBoundary from "@/components/error-boundry/error-boundry";
import ForgotPasswordForm from "@/components/forgot-password/forgot-password";
import LoadingBar from "@/components/loader/loading-bar";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AuthRoute from "./auth-route";
import ProtectedRoute from "./protected-route";
import BranchForm from "@/app/branch/branch-form";
import ItemList from "@/app/item/item-list";
import PrecarriageList from "@/app/precarriages/precarriages-list";
import VendorForm from "@/app/vendor/vendor-form";
import VendorList from "@/app/vendor/vendor-list";
import PurchaseList from "@/app/purchase/purchase-list";
import PurchaseForm from "@/app/purchase/purchase-form";
import ContractList from "@/app/contract/contract-list";
import ContractForm from "@/app/contract/contract-form";
import InvoiceList from "@/app/invoice/invoice-list";
import InvoiceForm from "@/app/invoice/invoice-form";

function AppRoutes() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<AuthRoute />}>
          <Route path="/" element={<Login />} />
          <Route
            path="/forgot-password"
            element={
              <Suspense fallback={<LoadingBar />}>
                <ForgotPasswordForm />
              </Suspense>
            }
          />
          <Route path="/maintenance" element={<Maintenance />} />
        </Route>

        <Route path="/" element={<ProtectedRoute />}>
          <Route
            path="/setting"
            element={
              <Suspense fallback={<LoadingBar />}>
                <Settings />
              </Suspense>
            }
          />
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
            path="/master/buyer"
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
          <Route
            path="/master/marking"
            element={
              <Suspense fallback={<LoadingBar />}>
                <MarkingList />
              </Suspense>
            }
          />
          <Route
            path="/master/order-type"
            element={
              <Suspense fallback={<LoadingBar />}>
                <OrderTypeList />
              </Suspense>
            }
          />
          <Route
            path="/master/payment-term"
            element={
              <Suspense fallback={<LoadingBar />}>
                <PaymentTermList />
              </Suspense>
            }
          />
          <Route
            path="/master/port-of-loading"
            element={
              <Suspense fallback={<LoadingBar />}>
                <PortofList />
              </Suspense>
            }
          />
          <Route
            path="/master/pre-recepit"
            element={
              <Suspense fallback={<LoadingBar />}>
                <PreRecepitList />
              </Suspense>
            }
          />
          <Route
            path="/master/product"
            element={
              <Suspense fallback={<LoadingBar />}>
                <ProductList />
              </Suspense>
            }
          />
          <Route
            path="/master/scheme"
            element={
              <Suspense fallback={<LoadingBar />}>
                <SchemeList />
              </Suspense>
            }
          />
          <Route
            path="/master/shipper"
            element={
              <Suspense fallback={<LoadingBar />}>
                <ShipperList />
              </Suspense>
            }
          />
          <Route
            path="/master/vessel"
            element={
              <Suspense fallback={<LoadingBar />}>
                <VesselList />
              </Suspense>
            }
          />
          <Route
            path="/master/state"
            element={
              <Suspense fallback={<LoadingBar />}>
                <StateList />
              </Suspense>
            }
          />
          <Route
            path="/master/branch"
            element={
              <Suspense fallback={<LoadingBar />}>
                <BranchList />
              </Suspense>
            }
          />
          <Route
            path="/master/branch/create"
            element={
              <Suspense fallback={<LoadingBar />}>
                <BranchForm />
              </Suspense>
            }
          />
          <Route
            path="/master/branch/edit/:id"
            element={
              <Suspense fallback={<LoadingBar />}>
                <BranchForm />
              </Suspense>
            }
          />
          <Route
            path="/master/item"
            element={
              <Suspense fallback={<LoadingBar />}>
                <ItemList />
              </Suspense>
            }
          />
          <Route
            path="/master/precarriage"
            element={
              <Suspense fallback={<LoadingBar />}>
                <PreRecepitList />
              </Suspense>
            }
          />
          <Route
            path="/master/vendor"
            element={
              <Suspense fallback={<LoadingBar />}>
                <VendorList />
              </Suspense>
            }
          />
          <Route
            path="/master/vendor/create"
            element={
              <Suspense fallback={<LoadingBar />}>
                <VendorForm />
              </Suspense>
            }
          />
          <Route
            path="/master/vendor/edit/:id"
            element={
              <Suspense fallback={<LoadingBar />}>
                <VendorForm />
              </Suspense>
            }
          />

          <Route
            path="/master/purchase"
            element={
              <Suspense fallback={<LoadingBar />}>
                <PurchaseList />
              </Suspense>
            }
          />
          <Route
            path="/master/purchase/create"
            element={
              <Suspense fallback={<LoadingBar />}>
                <PurchaseForm />
              </Suspense>
            }
          />
          <Route
            path="/master/purchase/edit/:id"
            element={
              <Suspense fallback={<LoadingBar />}>
                <PurchaseForm />
              </Suspense>
            }
          />
          <Route
            path="/contract"
            element={
              <Suspense fallback={<LoadingBar />}>
                <ContractList />
              </Suspense>
            }
          />
          <Route
            path="/contract/create"
            element={
              <Suspense fallback={<LoadingBar />}>
                <ContractForm />
              </Suspense>
            }
          />
          <Route
            path="/contract/edit/:id"
            element={
              <Suspense fallback={<LoadingBar />}>
                <ContractForm />
              </Suspense>
            }
          />
          <Route
            path="/invoice"
            element={
              <Suspense fallback={<LoadingBar />}>
                <InvoiceList />
              </Suspense>
            }
          />
          <Route
            path="/invoice/create"
            element={
              <Suspense fallback={<LoadingBar />}>
                <InvoiceForm />
              </Suspense>
            }
          />
          <Route
            path="/invoice/edit/:id"
            element={
              <Suspense fallback={<LoadingBar />}>
                <InvoiceForm />
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
