import React from 'react'
import './sidebar.css';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';

function Sidebar() {
  const [dropdown, setDropdown]=React.useState(false);

function openDropdown(){
  setDropdown((prev)=> !prev);
} 

  return (
       <div className="aside">
          <aside>
            <h2 className='name'>powel-elss</h2>
            <div className="dashboard">
              <span className='heading'>DASHBOARD</span>
              <NavLink to='/' className='homeButton'><Icon icon="material-symbols:dashboard-outline" color="gray" width="20" />Home</NavLink>
            </div>
            <div className="pages">
              <span className='heading'>PAGES</span>
              <div className='linksWrapper'>
              <p onClick={openDropdown}><Icon icon="ci:users-group" color="gray" width="20" />Staff</p>
                  <ul className= {`${dropdown && 'dropDownActive'}`} >
                    <li><NavLink to='/Staff records'className='nav'><Icon icon="fluent-mdl2:document-set" color="gray" width="20" />Staff Records</NavLink></li>
                    <li><NavLink to='/NewUser'className='nav'><Icon icon="ri:user-add-line" color="gray" width="20" />Add new staff</NavLink></li>
                  </ul>
              </div>
              <NavLink to='/AllowancesForm' className='nav'><Icon icon="fluent:form-24-regular" color="gray" width="20" />Allowance Form</NavLink>
              <NavLink to='/ServiceForm'className='nav'><Icon icon="ant-design:form-outlined" color="gray" width="20" />Service Form</NavLink>
              <NavLink to='/DeductionForm'className='nav'><Icon icon="mdi:file-document-minus-outline" color="gray" width="20" />Deduction Form</NavLink>
              <NavLink to='/PaySlipForm'className='nav'><Icon icon="mdi:document-sign" color="gray" width="20" />Pay Slip</NavLink>
              <NavLink to='/ItemForm'className='nav'><Icon icon="system-uicons:document-stack" color="gray" width="20" />Items Form</NavLink>
              <NavLink to='/ExpenseForm'className='nav'><Icon icon="streamline:money-cash-bag-dollar-bag-payment-cash-money-finance" color="gray" width="20" />Expense Form</NavLink>
            </div>
            <button>Log out</button>
        </aside>
       </div>
  )
}

export default Sidebar;