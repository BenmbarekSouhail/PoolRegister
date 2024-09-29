import './All.css';

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const EmailForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tel: '',
    skillLevel: 'beginner', // Set default value for skillLevel
    gender: 'male', // Set default value for gender
  });
  
  const [emailStatus, setEmailStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name && formData.email && formData.tel && formData.skillLevel && formData.gender) {
      const serviceId = "service_gcskgnj";  // Your service ID
      const templateId = "template_fe5klk3"; // Your template ID
      const publicKey = "mvgWzZZeNwXXGQIgp"; // Your public key

      const templateParams = {
        name: formData.name,          // Matches {{name}} in template
        Email: formData.email,        // Matches {{Email}} in template
        tel: formData.tel,            // Matches {{tel}} in template
        SkillLevel: formData.skillLevel, // Matches {{SkillLevel}} in template
        Gender: formData.gender,      // Matches {{Gender}} in template
      };

      console.log(templateParams);  // Debugging: check if formData is correct

      emailjs.send(serviceId, templateId, templateParams, publicKey)
        .then((response) => {
          console.log('Email sent successfully', response);
          setEmailStatus('Email sent successfully!');
          setFormData({
            name: '',
            email: '',
            tel: '',
            skillLevel: '',
            gender: '',
          });
        })
        .catch((error) => {
          console.error('Error sending email', error);
          setEmailStatus('Error sending email. Please try again.');
        });
    } else {
      setEmailStatus('Please fill out all fields before submitting.');
    }
};

  return (
    <div id="background-image">
      <div id="registration-form">
        <h1>Register</h1>
        <form id="myForm" method="post" onSubmit={handleSubmit}>
        
          <label id="adj" htmlFor="name">Full name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label id="adj" htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label id="adj" htmlFor="tel">Phone:</label>
          <input
            type="tel"
            id="tel"
            name="tel"
            value={formData.tel}
            onChange={handleChange}
            required
          />

          <label id="adj" htmlFor="skill-level">Skill Level:</label>
          <select
            id="skill-level"
            name="skillLevel"
            value={formData.skillLevel}
            onChange={handleChange}
            required
          >
            
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

         

          <label id='adj' htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <button type="submit">Register</button>
        </form>
        <div id="result">{emailStatus}</div>
      </div>
    </div>
  );
};

export default EmailForm;