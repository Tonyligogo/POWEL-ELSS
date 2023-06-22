import "./deletestaff.css"
import Sidebar from "../sidebar/sidebar";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Icon } from '@iconify/react';

function DeleteStaff({closeModal}) {
    
    const {id} = useParams()
    const navigate = useNavigate()
    const [userDeleted, setUserDeleted] = useState(false)

     async function handleDelete(e){
        e.preventDefault()
        await axios.delete("http://localhost:5000/api/dashboard/delete_user/"+id,{
            headers: {authorization: "jwt " + localStorage.getItem("token")}
          }).then((res)=>{
            setUserDeleted(true)
          })
          setTimeout(() => {
            setUserDeleted(false);
            navigate("/StaffRecords")
          }, 3000);
          
     }

  return (
    <div className="home">
        <Sidebar/>
          <div className="homeContainer delete">
           <div className="deleteContainer">
            <p>Are you sure you want to delete this user?</p>
            <div className="btns">
                <button onClick={handleDelete} >YES</button>
                <Link to='/StaffRecords'><button>NO</button></Link>
            </div>
            { userDeleted && <p className='successMessage'> <Icon icon="mdi:success-circle" color="green" /> Staff deleted successfully</p>}
           </div>
          </div>
      </div>
  )
}

export default DeleteStaff