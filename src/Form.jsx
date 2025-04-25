import React from "react";
import "./Form.css";
import "./Location";

const Form = ({
  data,
  onChange,
  onSubmit,
  availableStates,
  availableCities,
  countriesList,
  formError,
  editId,
}) => {
  return (
    <>
      <h1>React Form Handling</h1>
      <form onSubmit={onSubmit} className="Form">
        <div className="Form-Container">
          <div className="input1">
            <label htmlFor="" style={{ textAlign: "center", margin: "10px" }}>
              First Name:
            </label>

            <input
              type="text"
              name="firstName"
              value={data.firstName}
              onChange={onChange}
              placeholder="Enter your first name"
            />
            {formError.firstName && (
              <p
                style={{
                  color: "red",
                  fontSize: "0.875rem",
                  marginTop: "4px",
                  marginLeft: "100px",
                }}
              >
                {formError.firstName}
              </p>
            )}
          </div>

          <div className="input1">
            <label style={{ textAlign: "center", margin: "10px" }}>
              Last Name:
            </label>
            <input
              type="text"
              name="lastName"
              value={data.lastName}
              onChange={onChange}
              placeholder="Enter your last name"
            />

            {formError.lastName && (
              <p
                style={{
                  color: "red",
                  fontSize: "0.875rem",
                  marginTop: "4px",
                  marginLeft: "100px",
                }}
              >
                {formError.lastName}
              </p>
            )}
          </div>

          <div className="input1">
            <label style={{ textAlign: "center", margin: "10px" }}>
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={onChange}
              placeholder="Enter your email"
            />
            {formError.email && (
              <p
                style={{
                  color: "red",
                  fontSize: "0.875rem",
                  marginTop: "4px",
                  marginLeft: "67px",
                }}
              >
                {formError.email}
              </p>
            )}
          </div>
        </div>
        <br />

        <br />

        <div className="Next-Field">
          <div className="input1">
            <label>Gender:</label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={data.gender === "male"}
              onChange={onChange}
            />
            <label>Male</label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={data.gender === "female"}
              onChange={onChange}
            />
            <label>Female</label>
            {formError.gender && (
              <p style={{ color: "red" }}>{formError.gender}</p>
            )}
          </div>

          <div className="Hobbies-Child">
            <label>Hobbies:</label>
            <input
              type="checkbox"
              name="hobbies"
              value="cricket"
              checked={data.hobbies.includes("cricket")}
              onChange={onChange}
            />
            <label>Cricket</label>

            {formError.hobbies && (
              <p
                style={{
                  color: "red",
                  fontSize: "0.875rem",
                  marginTop: "4px",
                  marginLeft: "67px",
                }}
              >
                {formError.hobbies}
              </p>
            )}
            <input
              type="checkbox"
              name="hobbies"
              value="football"
              checked={data.hobbies.includes("football")}
              onChange={onChange}
            />

            <label>Football</label>

            {formError.hobbies && (
              <p
                style={{
                  color: "red",
                  fontSize: "0.875rem",
                  marginTop: "4px",
                  marginLeft: "67px",
                }}
              >
                {formError.hobbies}
              </p>
            )}
            <input
              type="checkbox"
              name="hobbies"
              value="music"
              checked={data.hobbies.includes("music")}
              onChange={onChange}
            />
            <label>Music</label>

            {formError.hobbies && (
              <p
                style={{
                  color: "red",
                  fontSize: "0.875rem",
                  marginTop: "4px",
                  marginLeft: "67px",
                }}
              >
                {formError.hobbies}
              </p>
            )}
          </div>
        </div>

        <div className="Location">
          <div className="Select-1">
            <label>Country:</label>
            <select name="country" value={data.country} onChange={onChange}>
              <option value="">Select Country</option>
              {countriesList.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {formError.country && (
              <p style={{ color: "red" }}>{formError.country}</p>
            )}
          </div>

          <div className="Select-1">
            <label>State:</label>
            <select name="state" value={data.state} onChange={onChange}>
              <option value="">Select State</option>
              {availableStates.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {formError.state && (
              <p style={{ color: "red" }}>{formError.state}</p>
            )}
          </div>

          <div className="Select-1">
            <label>City:</label>
            <select name="city" value={data.city} onChange={onChange}>
              <option value="">Select City</option>
              {availableCities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {formError.city && <p style={{ color: "red" }}>{formError.city}</p>}
          </div>
        </div>

        <br />
        <div className="btn-Container">
          <button 
          type="submit">{editId !== null ? "Update" : "Submit"}</button>
          <button type="button">Reset</button>
        </div>
      </form>

    </>
  );
};

export default Form;
