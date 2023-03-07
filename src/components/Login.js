import React, { useState } from "react";
import { Container, Button, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const setInputField = (inputField, value) => {
    setFormData({
      ...formData,
      [inputField]: value,
    });

    if (!!errors[inputField]) {
      setErrors({
        ...errors,
        [inputField]: null,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const creds = {
      username: formData.email,
      password: formData.password,
    };
    const url = "https://express-t4.onrender.com/api/login";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("returned request");
        console.log(data.message);
        if (data.message === "Login success!") {
          navigate("/profile-list-page");
        } else {
          navigate("/");
        }
      });
  };

  return (
    <Container
      style={{
        width: "30rem",
        height: "30rem",
        marginTop: "2rem",
        justifyContent: "center",
        backgroundColor: "#0d061dba",
      }}
    >
      {/* Referenced Basic Form from : https://react-bootstrap.github.io/forms/overview/ */}
      <h2 className="text-center mb-4 color">Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 color" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={formData.email || ""}
            onChange={(e) => setInputField("email", e.target.value)}
            isInvalid={!!errors.email}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3 color" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={formData.password || ""}
            onChange={(e) => setInputField("password", e.target.value)}
            isInvalid={!!errors.password}
            required
          ></Form.Control>
        </Form.Group>

        <div className="text-center" style={{ marginTop: "2rem" }}>
          <Button style={{ width: "100%" }} variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
};
