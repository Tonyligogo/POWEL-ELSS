import React, { useState } from "react";
export const ProductModal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      description: "",
      quantity: "",
      price: "",
      total:""
    }
  );
  const [errors, setErrors] = useState("");
  const [total, setTotal] = useState(0);

  const validateForm = () => {
    if (formState.description && formState.quantity && formState.price) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    if(e.target.name === 'quantity'){
        updateTotalQuantity(e.target.value)
    }else if(e.target.name === 'price'){
        updateTotalPrice(e.target.value)
    }
  };
  const updateTotalQuantity = (val)=>{
    setTotal(val * formState.price)
  }
  const updateTotalPrice = (val)=>{
    setTotal(val * formState.quantity)
  }

  const handleSave = (e) => {
    e.preventDefault();
    const data = {...formState,total}
    if (!validateForm()) return;
    onSubmit(data);
    closeModal();
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <h3>Edit Product Information</h3>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea name="description" id="description" cols="40" rows="1" value={formState.description} onChange={handleChange}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
            type="number"
              name="quantity"
              onChange={handleChange}
              value={formState.quantity}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
            type="number"
              name="price"
              onChange={handleChange}
              value={formState.price}
            />
          </div>
           <div className="form-group">
            <label htmlFor="total">Total</label>
            <input
            type="number"
              name="total"
              readOnly
              value={formState.price * formState.quantity}
            />
          </div>
          {errors && <div className="error">{`There is an error in ${errors}`}</div>}
          <button type="submit" onClick={handleSave}>
            Save
          </button>
      </div>
    </div>
  );
};