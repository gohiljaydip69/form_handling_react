import React, { useContext , useEffect } from "react";
import "./Form.css";
import {StateContext}  from "./context/stateContext.jsx";
import { Location } from "./Location";
const Form = () => {

  const {
    data,
    setData,
    editId,  
    availableStates,
    setAvailableStates,
    availableCities,
    setAvailableCities,
    countriesList,
    setCountriesList,
    formError,
    dataArr,
    setDataArr,
    setSelectedRows,
    setEditIndex,
    setFormError
    
  } = useContext(StateContext)
  useEffect(() => {
    const parsed = localStorage.getItem("data");
    if (parsed) {
      setDataArr(JSON.parse(parsed));
    }
  }, []);
  


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

    if (!data.hobbies || data.hobbies.length === 0) {
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
  
      setDataArr((prev) => [...prev, newData]);
      setSelectedRows((prev) => prev.filter((id) => id !== newId));
    }

//     // Reset Data
// const handleReset = () => {
//   setData({
//     id: "",
//     firstName: "",
//     lastName: "",
//     email: "",
//     hobbies: [],
//     gender: "",
//     country: "",
//     state: "",
//     city: "",
//   });
//   setFormError({});
//   setEditIndex(null);
// };

  };



return (
    <>
      <h1>React Form Handling</h1>
      <form onSubmit={handleFormSubmit} className="Form">
        <div className="Form-Container">
          <div className="input1">
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={data.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
            />
            {formError.firstName && <p className="error">{formError.firstName}</p>}
          </div>

          <div className="input1">
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={data.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
            />
            {formError.lastName && <p className="error">{formError.lastName}</p>}
          </div>

          <div className="input1">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {formError.email && <p className="error">{formError.email}</p>}
          </div>
        </div>

        <div className="Next-Field">
          <div className="input1">
            <label>Gender:</label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={data.gender === "male"}
              onChange={handleChange}
            />
            <label>Male</label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={data.gender === "female"}
              onChange={handleChange}
            />
            <label>Female</label>
            {formError.gender && <p className="error">{formError.gender}</p>}
          </div>

          <div className="Hobbies-Child">
            <label>Hobbies:</label>
            {["cricket", "football", "music"].map((hobby) => (
              <span key={hobby}>
                <input
                  type="checkbox"
                  name="hobbies"
                  value={hobby}
                  checked={data.hobbies.includes(hobby)}
                  onChange={handleChange}
                />
                <label>{hobby.charAt(0).toUpperCase() + hobby.slice(1)}</label>
              </span>
            ))}
            {formError.hobbies && <p className="error">{formError.hobbies}</p>}
          </div>
        </div>

        <div className="Location">
          <div className="Select-1">
            <label>Country:</label>
            <select name="country" value={data.country} onChange={handleChange}>
              <option value="">Select Country</option>
              {countriesList.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {formError.country && <p className="error">{formError.country}</p>}
          </div>

          <div className="Select-1">
            <label>State:</label>
            <select name="state" value={data.state} onChange={handleChange}>
              <option value="">Select State</option>
              {availableStates.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {formError.state && <p className="error">{formError.state}</p>}
          </div>

          <div className="Select-1">
            <label>City:</label>
            <select name="city" value={data.city} onChange={handleChange}>
              <option value="">Select City</option>
              {availableCities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {formError.city && <p className="error">{formError.city}</p>}
          </div>
        </div>

        <div className="btn-Container">
          <button type="submit">{editId !== null ? "Update" : "Submit"}</button>
          <button type="button">Reset</button>
        </div>
      </form>
    </>
  );
};

export default Form;
