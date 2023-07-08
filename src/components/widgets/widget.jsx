import React from 'react'
import './widget.css'
import { Icon } from '@iconify/react';
import {BsGraphUp} from "react-icons/bs"
import {MdKeyboardArrowUp} from "react-icons/md"
import {FaChartBar} from "react-icons/fa"
import {FaCoins} from "react-icons/fa"
import { Link } from 'react-router-dom'

function widget({type}) {
let data;
switch(type){
  case "sales":
    data={
      top:"Sales",
      leftIcon: <FaChartBar/> ,
      iconBg: 'salesIconBg',
      link: "SalesSummary",
      rightIcon: <BsGraphUp/>,
      iconColor: 'salesIconColor'
    };
    break;
    case "expenses":
    data={
      top:"Expenses",
      leftIcon: <Icon icon="streamline:money-cash-bag-dollar-bag-payment-cash-money-finance" color="rgba(0, 0, 0, 0.60)" width="20" /> ,
      iconBg: 'expensesIconBg',
      link: "ExpensesSummary",
      rightIcon: <FaCoins/>,
      iconColor: 'expensesIconColor'
    };
    break;
    case "services":
    data={
      top:"Services",
      leftIcon: <Icon icon="medical-icon:i-social-services" color="rgba(0, 0, 0, 0.60)" width="20" /> ,
      iconBg: 'servicesIconBg',
      link: "ServicesSummary",
      rightIcon: <BsGraphUp/>,
      iconColor: 'servicesIconColor'
    };
    break;
    case "serviceForm":
    data={
      top:"Service Form",
      leftIcon: <Icon icon="ant-design:form-outlined" width="20" />,
      iconBg: 'addUserIconBg',
      link: "ServiceForm",
      rightIcon: <Icon icon="ant-design:form-outlined" width="26" />,
      iconColor: 'addUserIconColor'
    };
    break;
    default:
      break;
}

  return (
    <div className='widget'>
        <div className="left">
            <p className='top'><span className={`leftIcon + ${data.iconBg}`}>{data.leftIcon}</span>{data.top}</p>
            <Link to= {`/${data.link}`} >{data.link}</Link>
        </div>
        <div className="right">
            <p className='percentage'><span className='upArrow'><MdKeyboardArrowUp/></span>20%</p>
        </div>
    </div>
  )
}

export default widget