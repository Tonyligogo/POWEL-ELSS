import {useEffect, useState} from 'react'
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import { ProductModal } from './ProductModal';
import './ProductsTable.css'

function ProductsTable() {

    const [tableRow, setTableRow] = useState([])
    const [rowToEdit, setRowToEdit] = useState(null);
    const [formData, setFormData] = useState({
        description:'',
        quantity:'',
        price:'',
    })
    const [modalOpen, setModalOpen] = useState(false);
    const handleDeleteRow = (targetIndex) => {
        setTableRow(tableRow.filter((_, index) => index !== targetIndex));
    };
    function changeValue(e){
        setFormData({...formData, [e.target.name]:e.target.value})
    };
    const [allInputsFilled, setAllInputsFilled] = useState(true);
    function addProduct(e){
        e.preventDefault();
        if( formData.description && formData.quantity && formData.price )
        {
            const newData = {
                description:formData.description,
                quantity:formData.quantity,
                price:formData.price,
                total:formData.quantity *  formData.price
            };
            setTableRow([...tableRow, newData])
            setFormData({
                description:'',
                price:'',
                quantity:'',
                total:''
            })
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
            description:'',
            price:'',
            quantity:'',
        })
      }
      useEffect(()=>{
        if(!allInputsFilled){
            toast.error('Please fill all the text fields', {
                id:'allInputsFilled'
            })
        }
    },[allInputsFilled])
      async function handleSaveProducts(e){
        e.preventDefault();
      
    }

  return ( 
            <div className="productsDefinitionWrapper">
                <h3>Provide product information</h3>
                <form className='productsDefinitionForm'>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" cols="40" rows="1" required value={formData.description} onChange={changeValue}></textarea>
                    </div>
                    <div>
                        <label htmlFor="quantity">Quantity</label>
                        <input type='number' name="quantity" id="quantity" required value={formData.quantity} onChange={changeValue}/>
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input type='number' name="price" id="price" required value={formData.price} onChange={changeValue}/>
                    </div>
                    <div>
                        <label>Total</label>
                        <span className='totalSpan'>{formData.quantity * formData.price}</span>
                    </div>
                </form>
                <div className="buttons">
                    <button onClick={addProduct}>Add</button>
                    <button onClick={clearForm}>Clear</button>
                </div>
                {tableRow.length > 0 && 
                <div className='itemsTable'>
                    <div className='tableWrapper'>
                        <table>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Description</th>
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
                                                <td>{row.description}</td>
                                                <td>{row.quantity}</td>
                                                <td>{row.price}</td>
                                                <td>{row.total}</td>
                                                <td className='actionButtons'>
                                                    <Icon onClick={()=>handleEditRow(index)} icon="akar-icons:edit" color="#d74221" width="24" /> 
                                                    <Icon onClick={()=>handleDeleteRow(index)} icon="fluent-mdl2:delete" color="#d74221" width="24"/>
                                                </td> 
                                            </tr>
                                        </tbody>   
                                    )
                                })} 
                        </table> 
                    {modalOpen && (
                            <ProductModal
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
                        <button onClick={handleSaveProducts}>Submit</button>
                    </div>
                </div>}
            </div>
  )
}

export default ProductsTable