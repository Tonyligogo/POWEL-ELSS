import React from 'react'
import './widget.css'
import {FcSalesPerformance} from "react-icons/fc"
import {BsGraphUp} from "react-icons/bs"
import {MdKeyboardArrowUp} from "react-icons/md"
import {BsCurrencyExchange} from "react-icons/bs"
import {FaUsers} from "react-icons/fa"
import {FaUserPlus} from "react-icons/fa"
import {FaChartBar} from "react-icons/fa"
import {FaCoins} from "react-icons/fa"
import { Link } from 'react-router-dom'

function widget({type}) {
const amount = '20,000'
let data;
switch(type){
  case "sales":
    data={
      top:"Sales",
      leftIcon: <FaChartBar/> ,
      iconBg: 'salesIconBg',
      isMoney: true,
      link: "Sales summary",
      rightIcon: <BsGraphUp/>,
      iconColor: 'salesIconColor'
    };
    break;
    case "expenses":
    data={
      top:"Expenses",
      leftIcon: <BsCurrencyExchange/> ,
      iconBg: 'expensesIconBg',
      isMoney: true,
      link: "Expenses summary",
      rightIcon: <FaCoins/>,
      iconColor: 'expensesIconColor'
    };
    break;
    case "services":
    data={
      top:"Services",
      leftIcon: <FcSalesPerformance/> ,
      iconBg: 'servicesIconBg',
      isMoney: false,
      link: "Services summary",
      rightIcon: <BsGraphUp/>,
      iconColor: 'servicesIconColor'
    };
    break;
    case "newUser":
    data={
      top:"Add new User",
      leftIcon: <FaUsers/> ,
      iconBg: 'addUserIconBg',
      isMoney: false,
      link: "Add new User",
      rightIcon: <FaUserPlus/>,
      iconColor: 'addUserIconColor'
    };
    break;
    case "newItem":
    data={
      top:"New Item",
      leftIcon: <FaUsers/> ,
      iconBg: 'addUserIconBg',
      isMoney: false,
      link: "Add new User",
      rightIcon: <FaUserPlus/>,
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
            <span>{data.isMoney ? amount : "No money"}</span>
            <Link to='/'>{data.link}</Link>
        </div>
        <div className="right">
            <p className='percentage'><span className='upArrow'><MdKeyboardArrowUp/></span>20%</p>
            <span className={`rightIcon + ${data.iconColor}`}>{data.rightIcon}</span>
        </div>
    </div>
  )
}

export default widget