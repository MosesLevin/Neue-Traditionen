import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const backendURL =
  import.meta.env.VITE_BACKEND_URL || "https://neuetraditionen.herokuapp.com";
function ContactForm() {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("Submit");

  const navigate = useNavigate();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const { name, email, message } = e.target.elements;
    const details = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
    fetch(`${backendURL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    })
      .then((reply) => {
        setStatus("Submit");
        return reply.json();
      })
      .then(alert("Thank you, message sended"))
      .then(navigate("/"));
  };

  return (
    <>
      <h1>
        if you feel the need to talk to someone, enter your email to receive an
        invitation
      </h1>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="name"
          htmlFor="name"
          label="Your name"
          variant="outlined"
        />
        <TextField
          id="email"
          htmlFor="email"
          label="email"
          variant="outlined"
          type="email"
          placeholder="exemple@exemple.com"
        />
        <TextField
          id="message"
          htmlFor="message"
          label="Message"
          variant="outlined"
          placeholder="Put a message here if you want to."
          multiline
          maxRows={5}
          value={value}
          onChange={handleChange}
        />
        <button type="submit">{status}</button>
      </Box>
    </>
  );
}

export default ContactForm;
