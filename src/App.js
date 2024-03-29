import React from "react";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
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
import { useAuthContext} from "./context/AuthProvider";
import PrivateRoute from "./RequireAuth/PrivateRoute";
import ServiceInvoice from "./components/servicessummary/ServiceInvoice";
import NewCustomer from "./components/customers/NewCustomer";
import CustomerRecords from "./components/customers/CustomerRecords";
import Quotation from "./components/quotation/Quotation";
import QuotationData from "./components/quotation/QuotationData";
import MakeSale from "./components/makeSale/MakeSale";
import CreateQuotation from "./components/quotation/CreateQuotation";

function App() {
  const [loading, setLoading] = React.useState(true);
  const preLoader = document.getElementById("preLoader");

  if (preLoader) {
    setTimeout(() => {
      preLoader.style.display = "none";
      setLoading(false);
    }, 3000);
  }

  const {authToken} = useAuthContext();

  const ProtectedRoute = ({ children }) => {
    if (!authToken) {
      return <Navigate to="/LoginPage" replace/>;
    }
    return children
  };

  return (
    !loading && (
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={<ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
            />
            <Route path="DeductionForm" element={ <PrivateRoute> <DeductionForm /> </PrivateRoute>} />
            <Route path="LoginPage" element={<LoginPage />} />
            {/* <Route path="DeductionForm" element={<DeductionForm />} /> */}
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
      
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
  );
}
export default App;
