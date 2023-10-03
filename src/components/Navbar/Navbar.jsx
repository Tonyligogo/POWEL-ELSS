import './Navbar.css'
import { useAuthContext } from '../../context/AuthProvider'
import { Icon } from '@iconify/react';
import moment from "moment";
import { useEffect, useState } from 'react';

function Navbar() {
    const { currentUser} = useAuthContext();
    const currentDate = new Date();
    
const [time, setTime] = useState(new Date().toLocaleTimeString());

useEffect(() => {
    let secTimer = setInterval( () => {
      setTime(new Date().toLocaleTimeString())
    },1000)

    return () => clearInterval(secTimer);
}, []);
  return (
    <nav>
        <div className="left">
            <div className="greeting">
                <p>Hello there, {currentUser}</p>
                <Icon icon="noto:waving-hand" width="30" />
            </div>
            <div className="dateTime">
                <small>{moment(currentDate, moment.ISO_8601).format("MMM Do YY")}</small>
                <small>{time}</small>
            </div>
        </div>
        <div className="right">
            <Icon icon="mingcute:user-4-fill"  color="gray" width="40" />
            <small>Admin</small>
        </div>
    </nav>
  )
}

export default Navbar