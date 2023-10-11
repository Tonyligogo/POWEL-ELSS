import React from "react";
import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements} from "react-router-dom";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import DeductionForm from "./components/deduction/deduction";
import AllowancesForm from "./components/allowance/Allowances";
import PaySlipForm from "./components/payslip/Payslip";
import ItemForm from "./components/item/Item";
import ServiceForm from "./components/serviceForm/Service";
import Sidebar from "./components/sidebar/sidebar";
import NewUser from "./components/newUser/newUser";
import ExpenseForm from "./components/expenses/Expenses";
import StaffRecords from "./components/staffRecords/StaffRecords";
import SalesSummary from "./components/salessummary/SalesSummary";
import ExpensesSummary from "./components/expensessummary/ExpensesSummary";
import ServicesSummary from "./components/servicessummary/ServicesSummary";
import DeleteStaff from "./components/staffRecords/DeleteStaff";
import Cart from "./components/products/Cart";
import ErrorPage from "./components/error/Error";
import Products from "./components/products/Products";
import NewProduct from "./components/products/NewProduct";
import Checkout from "./components/products/Checkout";
import Invoice from "./components/products/Invoice";
// import { useAuthContext} from "./context/AuthProvider";
import PrivateRoute from "./RequireAuth/PrivateRoute";
import ServiceInvoice from "./components/servicessummary/ServiceInvoice";
import NewCustomer from "./components/customers/NewCustomer";
import CustomerRecords from "./components/customers/CustomerRecords";
import Quotation from "./components/quotation/Quotation";
import QuotationData from "./components/quotation/QuotationData";
import MakeSale from "./components/makeSale/MakeSale";
import CreateQuotation from "./components/quotation/CreateQuotation";
import Layout from "./Layout/Layout";
import {QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import NewQuotation from "./components/newQuotation/NewQuotation";



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="LoginPage" element={<LoginPage />} />
    <Route path="/" element={<Layout/>}>
      <Route index element={<PrivateRoute> <HomePage /> </PrivateRoute>} />
      <Route path="DeductionForm" element={<DeductionForm />} />
      <Route path="AllowancesForm" element={<AllowancesForm />} />
      <Route path="PaySlipForm" element={<PaySlipForm />} />
      <Route path="ItemForm" element={<ItemForm />} />
      <Route path="ServiceForm" element={<ServiceForm />} />
      <Route path="Sidebar" element={<Sidebar />} />
      <Route path="NewUser" element={<NewUser />} />
      <Route path="StaffRecords" element={<StaffRecords />} /> 
      <Route path="StaffRecords/delete/:id" element={<DeleteStaff />} />
      <Route path="ExpenseForm" element={<ExpenseForm />} />
      <Route path="SalesSummary" element={<SalesSummary />} />
      <Route path="ExpensesSummary" element={<ExpensesSummary />} />
      <Route path="ServicesSummary" element={<ServicesSummary />} />
      <Route path="NewProduct" element={<NewProduct />} />
      <Route path="Invoice" element={<Invoice />} />
      <Route path="service-invoice/:id" element={<ServiceInvoice/>} />
      <Route path="NewCustomer" element={<NewCustomer />} />
      <Route path="CustomerRecords" element={<CustomerRecords />} />
      <Route path="Quotation" element={<Quotation />} />
      <Route path="CreateQuotation" element={<CreateQuotation />} />
      <Route path="QuotationData/:id" element={<QuotationData />} />
      <Route path="MakeSale" element={<MakeSale />} />
      <Route path="Products" element={<Products />} />
      <Route path="Checkout" element={<Checkout />} />
      <Route path="Cart" element={<Cart />} />
      <Route path="NewQuotation" element={<NewQuotation />} />
      
      <Route path="*" element={<ErrorPage />} />
    </Route>
    </Route>
  )
);

function App() {
  const queryClient = new QueryClient();
  return(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position='top-right'/>
    </QueryClientProvider>
  );
}
export default App;
