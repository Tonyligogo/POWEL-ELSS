import './tableTemplate.css';
 import React from 'react'
 
 function TableTemplate() {
   return (
     <div className='tableContainer'>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Extension</td>
            <td>2</td>
            <td>120</td>
            <td>240</td>
          </tr>
          <tr>
            <td>Plug</td>
            <td>2</td>
            <td>120</td>
            <td>240</td>
          </tr>
          <tr>
            <td>Extension</td>
            <td>2</td>
            <td>120</td>
            <td>240</td>
          </tr>
          <tr>
            <td>Plug</td>
            <td>2</td>
            <td>120</td>
            <td>240</td>
          </tr>
        </tbody>
      </table>
     </div>
   )
 }
 
 export default TableTemplate