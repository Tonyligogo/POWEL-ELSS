import React from 'react'
import './sidebar.css';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [dropdown, setDropdown]=React.useState(false);

function openDropdown(){
  setDropdown((prev)=> !prev);
} 
const [dropdown2, setDropdown2]=React.useState(false);

function openDropdown2(){
  setDropdown2((prev)=> !prev);
} 
const navigate = useNavigate();
function handleLogOut(e){
  e.preventDefault()
  const data = {email:"tonyligogo@gmail.com", password:"tonyliboso"}
  axios.post("http://localhost:5000/api/auth/logout", data,{
    headers: {authorization: "jwt " + localStorage.getItem("token")}
  })
  .then((res) =>{
    localStorage.setItem("token", res.data.authorization)
    navigate("/LoginPage")
  })
}

  return (
       <div className="aside">
          <aside>
            <h2 className='name'>powel-elss</h2>
            <div className="dashboard">
              <span className='heading'>DASHBOARD</span>
              <NavLink to='/HomePage' className='homeButton'><Icon className='icon' icon="radix-icons:dashboard" width="20" />Home</NavLink>
            </div>
            <div className="pages">
              <span className='heading'>PAGES</span>
              <div className='linksWrapper'>
                <p onClick={openDropdown}><Icon className='icon' icon="ci:users-group" width="20" />Staff</p>
                  <ul className= {`${dropdown && 'dropDownActive'}`} >
                    <li><NavLink to='/StaffRecords'className='nav'><Icon icon="fluent-mdl2:document-set" width="20" />Staff Records</NavLink></li>
                    <li><NavLink to='/NewUser'className='nav'><Icon icon="ri:user-add-line" width="20" />Add new staff</NavLink></li>
                  </ul>
              </div>
              <div className='linksWrapper'>
                <p onClick={openDropdown2}><Icon className='icon' icon="fluent-mdl2:document-set" width="20" />Forms</p>
                  <ul className= {`${dropdown2 && 'dropDownActive'}`} >
                    <li><NavLink to='/AllowancesForm' className='nav'><Icon icon="fluent:form-24-regular" width="22" />Allowance Form</NavLink></li>
                    <li><NavLink to='/DeductionForm'className='nav'><Icon icon="mdi:file-document-minus-outline" width="20" />Deduction Form</NavLink></li>
                    <li><NavLink to='/PaySlipForm'className='nav'><Icon icon="mdi:document-sign" width="20" />Pay Slip</NavLink></li>
                  </ul>
              </div>
              <NavLink to='/AllowancesForm' className='nav'><Icon icon="fluent:form-24-regular" width="22" />Allowance Form</NavLink>
              <NavLink to='/DeductionForm'className='nav'><Icon icon="mdi:file-document-minus-outline" width="20" />Deduction Form</NavLink>
              <NavLink to='/ExpenseForm'className='nav'><Icon icon="streamline:money-cash-bag-dollar-bag-payment-cash-money-finance" width="20" />Expense Form</NavLink>
              <NavLink to='/NewItem' className='nav'><Icon icon="fluent:form-24-regular" width="22" />Add to productList</NavLink>
              <NavLink to='/Cart' className='nav'><Icon icon="fluent:form-24-regular" width="22" />Add to cart</NavLink>
            </div>
            <button onClick={handleLogOut} className='logoutButton'><Icon icon="material-symbols:logout" />Log out</button>
        </aside>
       </div>
  )
}

export default Sidebar;