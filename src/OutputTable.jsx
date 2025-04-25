import React from "react";
import "./Form.css";
import { CiSquarePlus } from "react-icons/ci";

const OutputTable = ({
  dataArr,
  onDelete,
  onEdit,
  selectedRows,
  handleCheckedBox,
  handleAllCheked,
  handleDeleteAll
}) => {
  return (
    <>
    <div className="Btn-Box">
      <button type="Add" className="Add-UserBtn" >
      <CiSquarePlus className=" on"/>
      Add New User
      </button>
      
      <button 
      disabled={selectedRows.length === 0  }
      type="Delete"
      className="Delete-Btn"
      onClick={()=>{handleDeleteAll()}}
      >{selectedRows.length === dataArr.length ? "Delete All" : "Delete"}
</button>
      </div>
      <br />
      <table border="1">
        <thead>
          <tr>
            <th>
              <input
               type="checkbox"
               className="Fun-Check"
               checked={selectedRows.length == dataArr.length && selectedRows.length > 0}
               onChange={() => handleAllCheked()}
               />
            </th>
            <th>No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Hobbies</th>
            <th>Gender</th>
            <th>Country</th>
            <th>State</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataArr?.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                 type="checkbox"
                  className="Fun-Check" 
                  checked={selectedRows.includes(item.id)}
                  onChange={() => {handleCheckedBox(item.id)}}/>
              </td>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.hobbies}</td>
              <td>{item.gender}</td>
              <td>{item.country}</td>
              <td>{item.state}</td>
              <td>{item.city}</td>
              <td>
                <div className="action-btn">
                  
                  <button 
                  disabled={!selectedRows.includes(item.id)}
                  onClick={() => onEdit(item.id)}
                  >Edit</button>
                  <button 
                  disabled={!selectedRows.includes(item.id)}
                  onClick={() => onDelete(item.id)}
                  >Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default OutputTable;
