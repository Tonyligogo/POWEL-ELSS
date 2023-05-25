import React, {useState} from 'react'
import './item.css';
import Sidebar from "../sidebar/sidebar"

function Item() {

    const [tableData, setTableData] = useState([])

    const [formData, setFormData] = useState({
        id:1,
        clientName:'',
        itemName:'',
        price:'',
        quantity:'',
    })
    function changeValue(e){
        setFormData({...formData, [e.target.name]:e.target.value})

    }
    function addProduct(e){
        e.preventDefault();
        const newData = {
            clientName:formData.clientName,
            itemName:formData.itemName,
            price:formData.price,
            quantity:formData.quantity,
            totalCost: formData.price * formData.quantity
        };
        setTableData([...tableData, newData])   
    }

  return (
    <div className="home">
        <Sidebar/>
        <div className='homeContainer'>
            <div className='itemForm'>
                <h2>ITEM SALE</h2>
                <form>
                <div className="item">
                <div className="itemDetails">
                    <div>
                        <label>Client Name</label>
                        <input type="text" name='clientName'required onChange={changeValue} />
                    </div>
                    <div>
                        <label>Invoice Code</label>
                        <label className='outputField'></label>
                    </div>
                    <div>
                        <label>Item Name</label>
                        <input type="text" name='itemName' required onChange={changeValue}/>
                    </div>
                    <div>
                        <label>Date</label>
                        <label className='outputField'></label>
                    </div>
                    <div>
                        <label>Unit Price</label>
                        <input type="number" name='price' required onChange={changeValue}/>
                    </div>
                    <div>
                        <label>Time</label>
                        <label className='outputField'></label>
                    </div>
                    <div>
                        <label>Quanity</label>
                        <input type="number" name='quantity' required onChange={changeValue}/>
                    </div>
                    <div>
                        <label>Total Cost</label>
                        <label className='outputField'></label>
                    </div>
                    <div>
                        <label>Subtotal</label>
                        <label className='outputField'></label>
                    </div>
                </div>
                <div className="buttons">
                    <button onClick={addProduct} >Add</button>
                    <button>Clear</button>
                </div>
                </div>
                </form>
                <div className='itemsTable'>
            <p className='cartHeading'>Cart</p>
            
            <div className='tableContainer'>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    {tableData && tableData.map((data)=>{
                        return(
                            <tbody>
                                <tr key={data.id + 1}>
                                    <td>{}</td>
                                    <td>{data.itemName}</td>
                                    <td>{data.quantity}</td>
                                    <td>{data.price}</td>
                                    <td>{data.totalCost}</td>
                                    <td> <button>Edit</button> <button>Delete</button> </td> 
                                </tr>
                             </tbody>   
                        )
                    })} 
                </table>
            </div>

            <div className="buttons">
                <button>Submit</button>
                <button>Delete</button>
            </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Item