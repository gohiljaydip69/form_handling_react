import React, {useContext} from "react";
import "./Form.css";
import { CiSquarePlus } from "react-icons/ci";
import {StateContext}  from "./context/stateContext.jsx";


const OutputTable = () => {

    const {
      data,
      setData,
      dataArr,
      setDataArr,
      selectedRows,
      setSelectedRows,
      setEditIndex,
      
      
    } = useContext(StateContext);

 // Handle Delete
 const handleDelete = (id) => {
  const delData = dataArr.filter((item) => item.id !== id);
  setDataArr(delData);
};

// Handle Edit
const handleEdit = (id) => {
  const Index = dataArr.findIndex((item) => item.id === id);

  setData({ ...dataArr[Index] });
  setEditIndex(Index); // Set the index
};

//handle ChekedBox
const handleCheckedBox = (id) => {
  if (selectedRows.includes(id)) {
    setSelectedRows(selectedRows.filter((item) => id !== item));
  } else {
    setSelectedRows([...selectedRows, id]);
  }   
};

const handleAllCheked = () => {
  if (selectedRows.length === dataArr.length) {
    setSelectedRows([]);
  } else {
    const allSelectedIds = dataArr.map((item) => item.id);
    setSelectedRows(allSelectedIds);
  }
};

const handleDeleteAll = () => {
  // if (selectedRows.length === dataArr.length) {
  //   localStorage.removeItem("data");
  //   setDataArr([]);
  // } else {
  //     const updatedData = dataArr.filter((item) => !selectedRows.includes(item.id));
  //     console.log(updatedData)
  //     setDataArr(updatedData);
  //     setSelectedRows([]);
  //   };
    const updatedData = dataArr.filter((item) => !selectedRows.includes(item.id));
    setDataArr(updatedData);
    localStorage.setItem("data", JSON.stringify(updatedData)); 
    setSelectedRows([]);
  
};




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
              <td>{item.hobbies.join(", ")}</td>
              <td>{item.gender}</td>
              <td>{item.country}</td>
              <td>{item.state}</td>
              <td>{item.city}</td>
              <td>
                <div className="action-btn">
                  
                  <button 
                  disabled={!selectedRows.includes(item.id)}
                  onClick={() => handleEdit(item.id)}
                  >Edit</button>
                  <button 
                  disabled={!selectedRows.includes(item.id)}
                  onClick={() => handleDelete(item.id)}
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
