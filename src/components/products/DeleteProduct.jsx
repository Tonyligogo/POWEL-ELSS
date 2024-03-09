import "../staffRecords/deletestaff.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import toast from "react-hot-toast";

function DeleteProduct({product_id, productName, refetchProducts, closeModal}) {
    
  const [error, setError] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [userDeleted, setUserDeleted] = useState(false);

     async function handleDelete(e){
        e.preventDefault()
        setLoading(true)
        await axios.delete("http://localhost:5000/api/dashboard/delete-item/"+product_id,{
            headers: {authorization: "jwt " + sessionStorage.getItem("token")}
          }).then((res)=>{
            setUserDeleted(true)
            refetchProducts()
          }).catch((error)=>{
                if(error.response.status === 401){ 
                  setError(true)
                  setErrMsg('It seems you are not authorized.Try logging in again')
                }else if(error.response){
                  setErrMsg('Network error. Check connection and try again.')
                }
                else if(error.request){
                    setErrMsg('Network error. Check connection and try again.')
                }else{
                  setErrMsg('An error occured. Refresh the page and try again.')
                }
          }).finally(() => {
            setLoading(false);
          });
          setTimeout(()=>{
            setUserDeleted(false);
            closeModal()
          }, 2000)  
     }
     if(userDeleted){
      toast.success('Record deleted', {
        id: 'success',
    })
     }
     if(errMsg !== ''){
      toast.error(errMsg, {
        id: 'error',
    })
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
                      <p>Are you sure you want to delete <span className="staffName">{productName}</span> from the records?</p>
                    {loading ? 
                      <div className="deleteBox">
                        <CircularProgress size="14px" className="progress"/>
                        <span>Deleting...</span>
                      </div> 
                      :
                      <div className="btns">
                          <button onClick={handleDelete} >YES</button>
                          <button onClick={closeModal} >No</button>
                      </div>
                    }
                </div>
        </div>
    </div>
  )
}

export default DeleteProduct