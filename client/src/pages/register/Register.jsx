import React, { useState } from 'react';
import TextInput from './TextInput';
import Submit from './Submit';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', age: '', occupation: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const jsonData = JSON.stringify(formData, null, 2);
    console.log(jsonData);
    // send to back-end and change page here
    // window.location.href = '/';
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h1 className="text-3xl font-bold underline text-sky-400">
        Welcome!
      </h1>
      <TextInput dataType="name" tooltip="Create Mepet Name:" value={formData.name} onChange={handleChange} />
      <TextInput dataType="age" tooltip="Enter your age:" value={formData.age} onChange={handleChange} />
      <TextInput dataType="occupation" tooltip="Enter your occupation" value={formData.occupation} onChange={handleChange} />
      <Submit onClick={handleSubmit} />
    </div>
  );
};

export default Register;