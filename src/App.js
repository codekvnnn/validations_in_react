import React, { useState } from 'react';
import './App.css';

const UserForm = (props) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formData, setFormData] = useState({}); // New state variable to store form data
  const [errors, setErrors] = useState({}); // New state variable to store validation errors

  const createUser = (e) => {
    e.preventDefault();

    // Perform validations
    const errors = {};

    if (firstname.trim() === '') {
      errors.firstname = 'First Name is required';
    }

    if (lastname.trim() === '') {
      errors.lastname = 'Last Name is required';
    }

    if (email.trim() === '') {
      errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      errors.email = 'Invalid email format';
    }

    if (password === '') {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    if (confirmPassword === '') {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length === 0) {
      const newUser = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      };

      setFormData(newUser); // Update the form data state
      setErrors({}); // Clear any previous errors
    } else {
      setErrors(errors); // Update the errors state
    }
  };

  const isValidEmail = (email) => {
    // Basic email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div>
      <form onSubmit={createUser}>
        <div>
          <label>First Name: </label>
          <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
          {errors.firstname && <p className="error">{errors.firstname}</p>}
        </div>
        <div>
          <label>Last Name: </label>
          <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
          {errors.lastname && <p className="error">{errors.lastname}</p>}
        </div>
        <div>
          <label>Email Address: </label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <label>Password: </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div>
          <label>Confirm Password: </label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>
        <input type="submit" value="Create User" />
      </form>

      <div>
        <h2>Form Data:</h2>
        <p>Firstname: {formData.firstname}</p>
        <p>Lastname: {formData.lastname}</p>
        <p>Email: {formData.email}</p>
        <p>Password: {formData.password}</p>
      </div>
    </div>
  );
};

export default UserForm;

