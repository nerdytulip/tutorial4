import React, { useState, useEffect } from "react";
import { Container, Card, ListGroup } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export const ProfileDetails = () => {
  const [user, setUser] = useState({});
  const location = useLocation();
  const id = location.state;
  console.log(id);

  useEffect(() => {
    fetch(`https://express-t4.onrender.com/api/users/${id}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error(error));
  }, [id]);

  return (
    // Referenced Container from : https://react-bootstrap.github.io/layout/grid/
    <Container
      style={{
        width: "50rem",
        height: "80rem",
        marginTop: "2rem",
        marginBottom: "4rem",
      }}
    >
      <h3 style={{ textAlign: "center" }}>Profile Details</h3>
      <br></br>
      {/* Referenced Card from : https://react-bootstrap.github.io/components/cards/ */}
      <Card className="mx-auto" border="info">
        <Card.Img variant="top" src={user.picture} />
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>
            <u>About :</u>
          </Card.Title>
          <Card.Text>{user.about}</Card.Text>
          <ListGroup bg={"secondary"} className="list-group-flush">
            <ListGroup.Item>
              <h6>Name : </h6>
              {user.name}
            </ListGroup.Item>
            <ListGroup.Item>
              <h6>Email : </h6>
              {user.email}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};
