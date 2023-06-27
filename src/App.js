import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import DeductionForm from "./components/deduction/deduction";
import AllowancesForm from "./components/allowance/Allowances";
import PaySlipForm from "./components/payslip/Payslip";
import ItemForm from "./components/item/Item";
import ServiceForm from "./components/serviceForm/Service";
import Sidebar from './components/sidebar/sidebar';
import NewUser from './components/newUser/newUser';
import ExpenseForm from "./components/expenses/Expenses";
import StaffRecords from './components/staffRecords/StaffRecords';
import SalesSummary from './components/salessummary/SalesSummary';
import ExpensesSummary from './components/expensessummary/ExpensesSummary';
import ServicesSummary from "./components/servicessummary/ServicesSummary";
import DeleteStaff from './components/staffRecords/DeleteStaff';
import Cart from './components/products/Cart';
import NewItem from './components/products/NewItem';

function App() {
  const [loading, setLoading] = React.useState(true);
  const preLoader = document.getElementById('preLoader');

  if(preLoader){
    setTimeout(() => {
      preLoader.style.display = "none";
      setLoading(false);
    }, 3000);
  }
  return (
    !loading && (
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={ <HomePage/> }/>
            <Route path='LoginPage' element={ <LoginPage/> }/>
            <Route path='DeductionForm' element={ <DeductionForm/> }/>
            <Route path='AllowancesForm' element={ <AllowancesForm/> }/>
            <Route path='PaySlipForm' element={ <PaySlipForm/> }/>
            <Route path='ItemForm' element={ <ItemForm/> }/>
            <Route path='ServiceForm' element={ <ServiceForm/> }/>
            <Route path='Sidebar' element={ <Sidebar/> }/>
            <Route path='NewUser' element={ <NewUser/> }/>
            <Route path='StaffRecords' element={ <StaffRecords/> }/>
            <Route path='StaffRecords/delete/:id' element={<DeleteStaff/> }/>
            <Route path='ExpenseForm' element={ <ExpenseForm/> }/>
            <Route path='SalesSummary' element={ <SalesSummary/> }/>
            <Route path='ExpensesSummary' element={ <ExpensesSummary/> }/>
            <Route path='ServicesSummary' element={ <ServicesSummary/> }/>
            <Route path='Cart' element={ <Cart/> }/>
            <Route path='NewItem' element={ <NewItem/> }/>
          </Route>
        </Routes>
      </BrowserRouter>
    )
  );
}
export default App;
