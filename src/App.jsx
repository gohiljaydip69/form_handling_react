import React, { useState, useEffect } from "react";
import "./App.css";
import OutputTable from "./OutputTable";
import Form from "./Form";
import { Location } from "./Location";
// import StateProvider from "./context/stateProvider";


const App = () => {
  const [data, setData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    hobbies: [],
    gender: "",
    country: "",
    state: "",
    city: "",
  });
  const [editId, setEditIndex] = useState(null);
  const [availableStates, setAvailableStates] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);
  const [countriesList, setCountriesList] = useState([]);
  const [formError, setFormError] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  const parsed = localStorage.getItem("data");
  const [dataArr, setDataArr] = useState(() => {
    if (parsed) {
      return parsed ? JSON.parse(parsed) : [];
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(dataArr));
  }, [dataArr]);

  // handle Country Change

  useEffect(() => {
    setCountriesList(Location.map((ctr) => ctr.country));
  }, []);

  // Handle State and City Change
  useEffect(() => {
    if (data.country) {
      const countryData = Location.find(
        (item) => item.country === data.country
      );
      setAvailableStates(countryData.states.map((state) => state.name));

      if (data.state && countryData) {
        const stateData = countryData.states.find(
          (state) => state.name === data.state
        );
        setAvailableCities(stateData.cities.map((city) => city.name));
      } else {
        setAvailableCities([]);
      }
    } else {
      setAvailableStates([]);
      setAvailableCities([]);
    }
  }, [data.country, data.state]);

  // Handle Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "hobbies") {
      setData((prevData) => {
        const hobbies = prevData.hobbies || [];
        if (checked) {
          return { ...prevData, hobbies: [...hobbies, value] };
        } else {
          return {
            ...prevData,
            hobbies: hobbies.filter((hobby) => hobby !== value),
          };
        }
      });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  // validate Function
  const validateForm = () => {
    const errors = {};
    if (!data.firstName) {
      errors.firstName = "First name is required";
    }

    if (!data.lastName) {
      errors.lastName = "Last name is required";
    }

    if (!data.email) {
      errors.email = "Email is required";
    }

    if (!data.gender) {
      errors.gender = "Gender is required";
    }

    if (data.hobbies.length === 0) {
      errors.hobbies = "At least 1 hobby is required";
    }

    if (!data.country) {
      errors.country = "Country is required";
    }

    if (!data.state) {
      errors.state = "State is required";
    }

    if (!data.city) {
      errors.city = "City is required";
    }

    setFormError(errors);

    return Object.keys(errors).length === 0;
  };

  // Handle Form Submit
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Check email
    const isDuplicate = dataArr.some(
      (item) => item.email === data.email && editId === null
    );
    if (isDuplicate) {
      alert("This email already exists.");
      return;
    }

    const storedId = dataArr.map((num) => {
      return num.id;
    });

    let checkId = storedId.sort((a, b) => a - b);
    let newId = 1;
    for (let i = 0; i < checkId.length; i++) {
      if (checkId[i] !== newId) {
        break;
      }
      newId++;
    }

    if (editId !== null) {
      const updated = [...dataArr];
      updated[editId] = { ...data, id: updated[editId].id };
      setDataArr(updated);
      setEditIndex(null);
    } else {
      const newData = { ...data, id: newId };
      1;
      setDataArr((prev) => [...prev, newData]);
      setSelectedRows((prev) => prev.filter((id) => id !== newId));
    }

    // Reset Data
    const resetData = {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      hobbies: [],
      gender: "",
      country: "",
      state: "",
      city: "",
    };

    setData(resetData);
  };

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
      <Form
        data={data}
        onChange={handleChange}
        onSubmit={handleFormSubmit}
        countriesList={countriesList}
        availableStates={availableStates}
        availableCities={availableCities}
        editId={editId}
        setEditIndex={setEditIndex}
        formError={formError}
      />
      <OutputTable
        dataArr={dataArr}
        setDataArr={setDataArr}
        onDelete={handleDelete}
        onEdit={handleEdit}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        handleCheckedBox={handleCheckedBox}
        handleAllCheked={handleAllCheked}
        handleDeleteAll={handleDeleteAll}
      />
      </>
  
  );
  
};


export default App;
