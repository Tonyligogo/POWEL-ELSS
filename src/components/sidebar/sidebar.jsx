import React from 'react'
import './sidebar.css';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../../context/AuthProvider';

function Sidebar() {
  const [dropdown, setDropdown]=React.useState(false);

function openDropdown(){
  setDropdown((prev)=> !prev);
  setDropdown2(false);
} 
const [dropdown2, setDropdown2]=React.useState(false);

function openDropdown2(){
  setDropdown2((prev)=> !prev);
  setDropdown(false);
} 
const {currentUser, removeToken} = useAuthContext();
const navigate = useNavigate();
function handleLogOut(e){
  e.preventDefault()
  const data = {email:currentUser}
  axios.post("http://localhost:5000/api/auth/logout",data,{
    headers: {authorization: "jwt " + sessionStorage.getItem("token")}
  })
  .then((res) =>{
    removeToken()
    navigate("/LoginPage")
  })
}

  return (
       <div className="aside">
          <aside>
            <h2 className='name'>powel-elss</h2>
            <div className="dashboard">
              <span className='heading'>DASHBOARD</span>
              <NavLink to='/' className='homeButton'><Icon className='icon' icon="radix-icons:dashboard" width="18"/>Home</NavLink>
            </div>
            <div className="pages">
              <span className='heading'>PAGES</span>
              <div className='linksWrapper'>
                <p onClick={openDropdown}><Icon icon="ion:people-outline" width="20" />Staff</p>
                  <ul className= {`${dropdown && 'dropDownActive'}`} >
                    <li><NavLink to='/StaffRecords'className='nav'><Icon icon="fluent-mdl2:document-set" width="18" />Staff Records</NavLink></li>
                    <li><NavLink to='/NewUser'className='nav'><Icon icon="ri:user-add-line" width="20" />Add new staff</NavLink></li>
                  </ul>
              </div>
              <div className='linksWrapper'>
                <p onClick={openDropdown2}><Icon className='icon' icon="fluent-mdl2:document-set" width="18" />Forms</p>
                  <ul className= {`${dropdown2 && 'dropDownActive'}`} >
                    <li><NavLink to='/AllowancesForm' className='nav'><Icon icon="fluent:form-24-regular" width="22" />Allowance Form</NavLink></li>
                    <li><NavLink to='/DeductionForm'className='nav'><Icon icon="mdi:file-document-minus-outline" width="20" />Deduction Form</NavLink></li>
                    <li><NavLink to='/PaySlipForm'className='nav'><Icon icon="mdi:document-sign" width="20" />Pay Slip</NavLink></li>
                  </ul>
              </div>
              <NavLink to='/ExpenseForm'className='nav'><Icon icon="ion:receipt-outline" width="20" />Expense Form</NavLink>
              <NavLink to='/Products' className='nav'><Icon icon="fluent-mdl2:product-variant" width="20" />Products</NavLink>
              <NavLink to='/CustomerRecords' className='nav'><Icon icon="ion:people-outline" width="20" />Our Customers</NavLink>
              <NavLink to='/CreateQuotation' className='nav'><Icon icon="teenyicons:receipt-outline" width="18" />Generate Quotation</NavLink>
              <NavLink to='/MakeSale' className='nav'><Icon icon="fluent-mdl2:product-catalog" width="21" />Make sale</NavLink>
              <NavLink to='/NewQuotation' className='nav'><Icon icon="fluent-mdl2:product-catalog" width="21" />New Quotation</NavLink>
            </div>
            <button onClick={handleLogOut} className='logoutButton'><Icon icon="material-symbols:logout" />Log out</button>
        </aside>
       </div>
  )
}

export default Sidebar;