import React, {useState} from 'react'
import './item.css';
import Sidebar from "../sidebar/sidebar";
import {Modal} from "../item/Modal"

function Item() {

    const [tableRow, setTableRow] = useState([])
    const [rowToEdit, setRowToEdit] = useState(null);
    const [formData, setFormData] = useState({
        clientName:'',
        itemName:'',
        price:'',
        quantity:'',
        total:''
    })
    const [modalOpen, setModalOpen] = useState(false);
    const handleDeleteRow = (targetIndex) => {
        setTableRow(tableRow.filter((_, index) => index !== targetIndex));
    };

    function changeValue(e){
        setFormData({...formData, [e.target.name]:e.target.value})
    };
    function addProduct(e){
        e.preventDefault();
        const newData = {
            clientName:formData.clientName,
            itemName:formData.itemName,
            price:formData.price,
            quantity:formData.quantity,
            total: formData.price * formData.quantity,
        };
        setTableRow([...tableRow, newData])
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
                        <input type="text" value={formData.clientName} name='clientName'required onChange={changeValue} />
                    </div>
                    <div>
                        <label>Invoice Code</label>
                        <label className='outputField'></label>
                    </div>
                    <div>
                        <label>Item Name</label>
                        <input type="text" value={formData.itemName} name='itemName' required onChange={changeValue}/>
                    </div>
                    <div>
                        <label>Date</label>
                        <label className='outputField'></label>
                    </div>
                    <div>
                        <label>Unit Price</label>
                        <input type="number" value={formData.price} name='price' required onChange={changeValue}/>
                    </div>
                    <div>
                        <label>Time</label>
                        <label className='outputField'></label>
                    </div>
                    <div>
                        <label>Quanity</label>
                        <input type="number" value={formData.quantity} name='quantity' required onChange={changeValue}/>
                    </div>
                    <div>
                        <label>Total Cost</label>
                        <label className='outputField'></label>
                    </div>
                    <div>
                        <label>Subtotal</label>
                        <input type="text" value={formData.price * formData.quantity} readOnly />
                    </div>
                </div>
                <div className="buttons">
                    <button onClick={addProduct}>Add</button>
                    <button>Clear</button>
                </div>
                </div>
                </form>
                <div className='itemsTable'>
            <p className='cartHeading'>Cart</p>
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
                                    <td>{row.total}</td>
                                    <td className='actionButtons'>
                                        <button type='button' onClick={()=>handleEditRow(index)} >Edit</button> 
                                        <button type='button' onClick={()=>handleDeleteRow(index)}>Delete</button>
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