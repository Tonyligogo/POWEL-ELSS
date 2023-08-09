import "./deletestaff.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Icon } from '@iconify/react';
import { CircularProgress } from "@mui/material";

function DeleteStaff({pid, firstName, lastName, closeModal, fetchEmployeeData}) {
    
  const [error, setError] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [userDeleted, setUserDeleted] = useState(false);

     async function handleDelete(e){
        e.preventDefault()
        setLoading(true)
        await axios.delete("http://localhost:5000/api/dashboard/delete_user/"+pid,{
            headers: {authorization: "jwt " + sessionStorage.getItem("token")}
          }).then((res)=>{
            setUserDeleted(true)
            fetchEmployeeData()
          }).catch((error)=>{
                if(error.response.status === 401){ 
                  setError(true)
                  setErrMsg('It seems you are not authorized.Try logging in again')
                }else if(error.request){
                    setErrMsg('Network error. Check connection and try again.')
                }else{
                  setErrMsg('An error occured. Refresh the page and try again.')
                }
          }).finally(() => {
            setLoading(false);
          });
          setTimeout(() => {
            setUserDeleted(false);
            closeModal()
          }, 2000);  
     }
     useEffect(() => {
      if (error) {
        const timeoutId = setTimeout(() => {
          navigate("/LoginPage")
        }, 3000); 
  
        return () => {
          clearTimeout(timeoutId);
        };
      }
    }, [error, navigate]);

  return (
          <div
            className="modal-container"
            onClick={(e) => {
            if (e.target.className === "modal-container") closeModal();
            }}
          >
        <div className="modal">
            <h3>Delete</h3>
                <div>
                    
                    {loading ? 
                      <CircularProgress size="24px" className="progress"/> 
                      :
                      <>
                      <p>Are you sure you want to delete {firstName} {lastName}?</p>
                      <div className="btns">
                          <button onClick={handleDelete} >YES</button>
                          <button onClick={closeModal} >No</button>
                      </div>
                      </>
                    }
                    { userDeleted && <p className='deleteSuccessMessage'> <Icon icon="mdi:success-circle" color="green" /> Record deleted successfully</p>}
                    {errMsg && <p className="deleteError"> <Icon icon="clarity:error-solid" color="red" width="22" /> {errMsg}</p> }
                </div>
        </div>
    </div>
  )
}

export default DeleteStaff