import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    hobbies: [],
    gender: '',
    country: '',
    state: '',
    city: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      const updatedHobbies = checked
        ? [...formData.hobbies, value]
        : formData.hobbies.filter((hobby) => hobby !== value);
      setFormData({ ...formData, hobbies: updatedHobbies });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your logic to send or use this formData
  };

  return (
    <div>
      <h1>Form Handling</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        /><br /><br />
        
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        /><br /><br />
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        /><br /><br />

        <div>
          <label>Hobbies:</label><br />
          <input
            type="checkbox"
            name="hobbies"
            value="Reading"
            onChange={handleChange}
            checked={formData.hobbies.includes('Reading')}
          /> Reading

          <input
            type="checkbox"
            name="hobbies"
            value="Sports"
            onChange={handleChange}
            checked={formData.hobbies.includes('Sports')}
          /> Sports

          <input
            type="checkbox"
            name="hobbies"
            value="Music"
            onChange={handleChange}
            checked={formData.hobbies.includes('Music')}
          /> Music
        </div><br />

        <div>
          <label>Gender:</label><br />
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={formData.gender === 'Male'}
            onChange={handleChange}
          /> Male

          <input
            type="radio"
            name="gender"
            value="Female"
            checked={formData.gender === 'Female'}
            onChange={handleChange}
          /> Female
        </div><br />

        <label><b>Country:</b></label><br /><br />
        <select name="country" value={formData.country} onChange={handleChange}>
          <option value="">Select Country</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
        </select>

        <select name="state" value={formData.state} onChange={handleChange}>
          <option value="">Select State</option>
          <option value="Gujarat">Gujarat</option>
          <option value="California">California</option>
        </select>

        <select name="city" value={formData.city} onChange={handleChange}>
          <option value="">Select City</option>
          <option value="Ahmedabad">Ahmedabad</option>
          <option value="Los Angeles">Los Angeles</option>
        </select><br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
