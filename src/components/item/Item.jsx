import React, {useState} from 'react'
import './item.css';
import Sidebar from "../sidebar/sidebar";
import {Modal} from "../item/Modal"
// import axios from 'axios';
import { Icon } from '@iconify/react';
import {nanoid} from "nanoid"

function Item() {

    const [tableRow, setTableRow] = useState([])
    const [rowToEdit, setRowToEdit] = useState(null);
    const [formData, setFormData] = useState({
        clientName:'',
        itemName:'',
        price:'',
        quantity:'',
        subTotal:'',
        total:'',
    })
    const [total, setTotal] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const handleDeleteRow = (targetIndex) => {
        setTableRow(tableRow.filter((_, index) => index !== targetIndex));
    };
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    let newId = nanoid(10).toString();
    function changeValue(e){
        setFormData({...formData, [e.target.name]:e.target.value})
        if(formData.itemName || formData.clientName){

        }
    };
    const [allInputsFilled, setAllInputsFilled] = useState(true);
    function addProduct(e){
        e.preventDefault();
        if( formData.itemName && formData.quantity && formData.price && formData.clientName )
        {
            // setAllInputsFilled(true);
            const newData = {
                invoice_code:newId,
                clientName:formData.clientName,
                itemName:formData.itemName,
                quantity:formData.quantity,
                price:formData.price,
                subTotal: formData.price * formData.quantity,
                total:total
            };
            setTableRow([...tableRow, newData])
            setTotal(prevTotal => prevTotal + Number(newData.subTotal))
        }else{
            setAllInputsFilled(false);
            setTimeout(() => {
                setAllInputsFilled(true);
                  }, 3000);
        }
    }
    const handleSave = (newRow) => {
        rowToEdit === null
          ? setTableRow([...tableRow, newRow])
          : setTableRow(
              tableRow.map((currRow, index) => {
                if (index !== rowToEdit) return currRow;
                return newRow;
              })
            );
      };
      const handleEditRow = (index) => {
        setRowToEdit(index);
        setModalOpen(true);
      };
      function clearForm(e){
        e.preventDefault();
        setFormData({
            clientName:'',
            itemName:'',
            price:'',
            quantity:'',
            subTotal:'',
            total:'',
        })
      }
      const [userCreated, setUserCreated] = useState(false);
      async function handleSaveItem(e){
        e.preventDefault();
        // const item = {
        //     invoice_code:newId,
        //     item:formData.itemName,
        //     quantity:formData.quantity,
        //     unit_price:formData.price,
        //     sub_total:formData.price * formData.quantity,
        // }
        // await axios.post("http://localhost:5000/api/dashboard/new-sale", item,{
        //     headers: {authorization: "jwt " + localStorage.getItem("token")}
        //   })
        // .then((response)=>{
        //     setUserCreated(true)
        // })
        // .catch((error)=>{
        //     if(error.response){
        //         console.log(error.response);
        //     }else if(error.request){
        //         console.log('network error')
        //     }else{
        //         console.log(error)
        //     }
        // })  
        // setTimeout(() => {
        //     setUserCreated(false);
        //     setFormData({
        //         clientName:'',
        //         itemName:'',
        //         price:'',
        //         quantity:'',
        //         total:''
        //     })
        //   }, 3000);
    }

  return (
    <div className="home">
        <Sidebar/>
        <div className='homeContainer'>
            <div className="itemSaleTitle">
                <h3>ITEM SALE</h3>
            </div>
            <div className='itemForm'>
                <form>
                <div className="item">
                <div className="itemDetails">
                    <div>
                        <label>Client Name</label>
                        <input type="text" value={formData.clientName} name='clientName' required onChange={changeValue} />
                    </div>
                    <div>
                        <label>Invoice Code</label>
                        <label className='outputField'>{newId}</label>
                    </div>
                    <div>
                        <label>Item Name</label>
                        <input type="text" value={formData.itemName} name='itemName' required onChange={changeValue}/>
                    </div>
                    <div>
                        <label>Date</label>
                        <label className='outputField' >{currentDate}</label>
                    </div>
                    <div>
                        <label>Unit Price</label>
                        <input type="number" value={formData.price} name='price' required onChange={changeValue}/>
                    </div>
                    <div>
                        <label>Time</label>
                        <label className='outputField'>{currentTime}</label>
                    </div>
                    <div>
                        <label>Quanity</label>
                        <input type="number" value={formData.quantity} name='quantity' required onChange={changeValue}/>
                    </div>
                    <div>
                        <label>Total Cost</label>
                        <input type='text' name='total' value={total} readOnly />
                    </div>
                    <div>
                        <label>Subtotal</label>
                        <input type="text" value={formData.price * formData.quantity} readOnly />
                    </div>
                </div>
                <div className="buttons">
                    <button onClick={addProduct}>Add</button>
                    <button onClick={clearForm}>Clear</button>
                </div>
                { !allInputsFilled && <p className='errorMessage'> <Icon icon="clarity:error-solid" color="red" width="24" /> Please fill all the required fields</p>}
                {tableRow.length > 0 && <div className='itemsTable'>
                    <p className='cartHeading'>
                        Cart
                    </p>
                    { userCreated && <p className='successMessage'> <Icon icon="mdi:success-circle" color="green" /> Sales information submitted successfully</p>}
                    <div className='tableContainer'>
                <form>
                <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                        </thead>
                        {tableRow && tableRow.map((row, index)=>{
                            return(
                                <tbody>
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td>{row.itemName}</td>
                                        <td>{row.quantity}</td>
                                        <td>{row.price}</td>
                                        <td>{row.subTotal}</td>
                                        <td className='actionButtons'>
                                            <Icon onClick={()=>handleEditRow(index)} icon="akar-icons:edit" color="#d74221" width="24" /> 
                                            <Icon onClick={()=>handleDeleteRow(index)} icon="fluent-mdl2:delete" color="#d74221" width="24"/>
                                        </td> 
                                    </tr>
                                </tbody>   
                            )
                        })} 
                    </table>
                </form>
                {modalOpen && (
                        <Modal
                        closeModal={() => {
                            setModalOpen(false);
                            setRowToEdit(null);
                        }}
                        onSubmit={handleSave}
                        defaultValue={rowToEdit !== null && tableRow[rowToEdit]}
                        />
                    )}
                    </div>
                    <div className="buttons">
                        <button onClick={handleSaveItem}>Submit</button>
                        <button>Delete</button>
                    </div>
                </div>}
                </div>
                </form>
                
            </div>
        </div>
    </div>
  )
}

export default Item