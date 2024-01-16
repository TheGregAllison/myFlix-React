import React, { useState } from 'react';

const UpdateForm = ({ user, handleSubmit, handleUpdate }) => {
  const [formData, setFormData] = useState({
    Username: user.Username,
    password: user.Password,
    email: user.Email
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    handleUpdate(e); // Assuming this is the function to handle updates in your parent component
  };

  return (
    <form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
      <h2>Update Account Details:</h2>
      <label>Username:</label>
      <input
        type="text"
        name="Username"
        value={formData.Username}
        onChange={handleChange}
      />
      <label>Password:</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <label>Email Address:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <button type="submit">Submit Changes</button>
    </form>
  );
};

export default UpdateForm;