import React, { createContext, useState } from "react";

// Create the context
export const StateContext = createContext();

 const FormContext = ({ children }) => {
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

  // Context values
  const validStates = {
    data,
    setData,
    editId,
    setEditIndex,
    availableStates,
    setAvailableStates,
    availableCities,
    setAvailableCities,
    countriesList,
    setCountriesList,
    formError,
    setFormError,
    selectedRows,
    setSelectedRows,
  };

  return (
    <StateContext.Provider value={validStates}>
      {children}
    </StateContext.Provider>
  );
};

export default  FormContext;