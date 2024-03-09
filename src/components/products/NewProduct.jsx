import { useEffect, useState } from 'react'
import './NewProduct.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import toast from 'react-hot-toast';

function NewProduct() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name:'',
        desc:'',
        category:'',
        price:''
    })
    const [productCreated, setProductCreated] = useState(false);
    const [loading, setLoading] = useState(false);
    function changeValue(e){
        setFormData({...formData, [e.target.name]:e.target.value})
    };
    async function addProduct(e){
        e.preventDefault();
        setLoading(true)
        const userData = {
            name:formData.name,
            desc:formData.desc,
            category:formData.category,
            price:formData.price,
            purpose:'test'
        }
        await axios.post("http://localhost:5000/api/dashboard/new-item", userData,{
            headers: {authorization: "jwt " + sessionStorage.getItem("token")}
          })
        .then((response)=>{
            setProductCreated(true)
        })
        .catch((error)=>{
            if(error.response){
                console.log(error.response);
            }else if(error.request){
                console.log('network error')
            }else{
                console.log(error)
            }
        }).finally(() => {
            setLoading(false);
          });  
        setTimeout(() => {
            setProductCreated(false);
            setFormData({
                name:'',
                desc:'',
                category:'',
                price:''
            })
            navigate("/Products")
          }, 2000);
    }
    useEffect(()=>{
        if(productCreated){
            toast.success('Saved successfully', {
                id:'productCreated'
            })
        }
    },[productCreated])

  return (
    <div>
        <div>
            <div className="productHeading">  
                <h3>New Product</h3>
            </div>
            <div className="productWrapper">
                    <h3>Product Information</h3>
                 <form className='productForm'>
                    <div className="formInput">
                        <label>Name</label>
                        <input type="text" value={formData.name} name='name' required onChange={changeValue} />
                    </div>
                    <div className="formInput">
                        <label>Description</label>
                        <input type="text" value={formData.desc} name='desc' required onChange={changeValue}/>
                    </div>
                    <div className="formInput">
                        <label>Category</label>
                        <input type="text" value={formData.category} name='category' required onChange={changeValue}/>
                    </div>
                    <div className="formInput">
                        <label>Price</label>
                        <input type="text" value={formData.price} name='price' required onChange={changeValue}/>
                    </div>
                </form>
                {loading ? 
                      <button><CircularProgress size="14px" className="progress"/>Saving...</button> 
                      :
                      <button onClick={addProduct} className="newCustomerSaveBtn">Save</button>
                    }
            </div>
        </div>
       </div>
  )
}

export default NewProduct