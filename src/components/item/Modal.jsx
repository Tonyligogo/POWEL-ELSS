import React, { useState } from "react";
import "./Modal.css";
export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      itemName: "",
      quantity: "",
      price: "",
      total:""
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.itemName && formState.quantity && formState.price) {
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
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit(formState);
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
        <h3>Edit Item</h3>
        <form>
          <div className="form-group">
            <label htmlFor="itemName">Item name</label>
            <input type="text" name="itemName" onChange={handleChange} value={formState.itemName} />
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
          <div className="form-group">
            <label htmlFor="total">Confirm Total</label>
            <input
            type="number"
              name="total"
              onChange={handleChange}
              value={formState.total}
            />
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" onClick={handleSave}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};