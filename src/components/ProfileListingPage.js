import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./ProfileListingPage.css";

export const ProfileListingPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterCriteria] = useState(["name"]);

  const fetchUsers = () => {
    fetch("https://express-t4.onrender.com/api/users")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      });
  };

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  function search(items) {
    return items.filter((item) => {
      return filterCriteria.some((newItem) => {
        return (
          item[newItem]
            .toString()
            .toLowerCase()
            .indexOf(searchKeyword.toLowerCase()) > -1
        );
      });
    });
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const navigateToProfile = (e) => {
    console.log(e.target.getAttribute("data-value"));
    var id = e.target.getAttribute("data-value");
    navigate("/profile", { state: id });
  };

  const renderCard = (card, index) => {
    return (
      <Col>
        <Card style={{ width: "18rem" }} key={index} className="box">
          <Card.Img
            variant="top"
            src={card.picture}
            data-value={card._id}
            onClick={navigateToProfile}
          />
          <Card.Body>
            <Card.Title>{card.name}</Card.Title>
            <Card.Text>{card.company}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <Container className="my-3">
      <h2 style={{ textAlign: "center" }}>Profile List </h2>
      <div>
        <Form>
          <Form.Group controlId="searchTerm">
            <Form.Control
              type="text"
              placeholder="Search by first name or last name"
              value={searchKeyword}
              onChange={handleSearchChange}
            />
          </Form.Group>
        </Form>
      </div>
      <Row xs={1} md={3} className="g-2">
        {search(users).map(renderCard)}
      </Row>
    </Container>
  );
};
