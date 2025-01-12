import React, { useState } from "react";
import TextInput from "./TextInput";
import Submit from "./Submit";
import FullWidthTabs from "./CharacterSelect";
import { useAuth0 } from "@auth0/auth0-react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    occupation: "",
  });
  const { user } = useAuth0();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    formData["email"] = user.email;
    const jsonData = JSON.stringify(formData, null, 2);

    try {
      const response = await fetch("http://localhost:5000/register-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      });

      // const jsonResponse = await response.json();
      // console.log(jsonResponse);
    } catch (error) {
      console.error("Network Error:", error);
      alert("Failed to submit data. Please try again later.");
    }

    // send to back-end and change page here
    // window.location.href = '/';
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h1 className="text-3xl font-bold underline text-sky-400 mb-4 text-center w-full">
        Welcome!
      </h1>
      <div className="flex flex-row justify-center items-center w-full">
        <div className="flex flex-col justify-end h-full">
          <FullWidthTabs />
        </div>
        <div className="flex flex-col justify-end items-center ml-8 h-full">
          <TextInput
            dataType="name"
            tooltip="Create Mepet Name:"
            value={formData.name}
            onChange={handleChange}
          />
          <TextInput
            dataType="age"
            tooltip="Enter your age:"
            value={formData.age}
            onChange={handleChange}
          />
          <TextInput
            dataType="occupation"
            tooltip="Enter your occupation"
            value={formData.occupation}
            onChange={handleChange}
          />
          <Submit onClick={handleSubmit} className="w-full mt-4 " />
        </div>
      </div>
    </div>
  );
};

export default Register;
