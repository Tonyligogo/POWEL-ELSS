import './service.css';
import React from 'react';
import TableTemplate from '../table/TableTemplate';
import Sidebar from '../sidebar/sidebar';

function Service() {
  return (
    <div className="home">
        <Sidebar/>
        <div className="homeContainer">
        <div className='serviceForm'>
        <h2>Service Form</h2>
        <div className="service">
        <div className="serviceDetails">
        <div>
            <label htmlFor="">Client Name</label>
            <input type="text" />
        </div>
        <div>
            <label htmlFor="">Invoice Code</label>
            <label className='outputField'></label>
        </div>
        <div>
            <label htmlFor="">Work Location</label>
            <input type="text" />
        </div>
        <div>
            <label htmlFor="">Date</label>
            <label className='outputField'></label>
        </div>
        <div>
            <label htmlFor="">Requested by</label>
            <input type="text" />
        </div>
        <div>
            <label htmlFor="">Time</label>
            <label className='outputField'></label>
        </div>
        <div>
            <label htmlFor="">Scope</label>
            <input type="text" />
        </div>
        <div>
            <label htmlFor="">Work Duration</label>
            <input type="number" min="0" />
        </div>
        <div className='scopeDescription'>
            <label htmlFor="">Scope Description</label>
            <textarea name="" id="" cols="30" rows="3"></textarea>
        </div>
        <div>
            <label htmlFor="">Cost</label>
            <input type="text" />
        </div>
        </div>
        <p>Service attended by (<span>Choose below</span>)</p>
        <div className='serviceTable'>
            <TableTemplate/>
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

export default Service