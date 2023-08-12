import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, Tab, Row, Col } from "react-bootstrap";
import ProjectCard from "../ProjectCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserDashboard() {
  // const projects = [
  //   {
  //     id: 1,
  //     name: "Project 1",
  //     description: "Description of Project 1",
  //     author: "amoo@email.com",
  //     members: ["User B", "User C"],
  //   },
  //   {
  //     id: 2,
  //     name: "Project 2",
  //     description: "Description of Project 2",
  //     author: "mike@me.com",
  //     members: ["User A", "User C"],
  //   },
  // ];
  
  const [userProjects, setUserProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [sharedProjects, setSharedProjects] = useState([]);
  const currentUser = JSON.parse(sessionStorage.userData);

  async function fetchProjects() {
    try {
      const createdByMe = await axios.get(
        `http://13.48.5.194:8000/api/v1/users/projects/${currentUser.id}`
      );
      // const sharedWithMe = await
      setUserProjects(createdByMe.data);
      setAllProjects([...userProjects, ...sharedProjects])
      console.log(createdByMe.data);
    } catch (err) {
      const error = err.response;
      console.log(error.data?.Error || "An error occurred");
    }
  }

  const navigate = useNavigate();
  useEffect(() => {
    fetchProjects(); 
  }, []);

  return (
    <Container fluid>
      <Navbar className="m-0 p-3" bg="primary-subtle" expand="lg">
        <Navbar.Brand className="px-4">User Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto ms-auto pe-4">
            <Nav.Link>Add Project</Nav.Link>
            <Nav.Link>Edit Profile</Nav.Link>
            <Nav.Link
              onClick={() => {
                sessionStorage.clear();
                navigate("/sign-in");
              }}
            >
              Log Out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Tab.Container id="dashboard-tabs" defaultActiveKey="allProjects">
        <Row className="mt-4">
          <Col md={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="allProjects">All Projects</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="createdByMe">Created by Me</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="sharedWithMe">Shared with Me</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col md={10}>
            <Tab.Content>
              <Tab.Pane eventKey="allProjects">
                {allProjects &&
                  allProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      name={project.name}
                      description={project.description}
                      author={project.author}
                      members={project.members.map((member) => member.email)}
                    />
                  ))}
              </Tab.Pane>
              <Tab.Pane eventKey="createdByMe">
                {userProjects &&
                  userProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      name={project.name}
                      description={project.description}
                      author={project.author}
                      members={project.members.map((member) => member.email)}
                    />
                  ))}
              </Tab.Pane>
              <Tab.Pane eventKey="sharedWithMe">
                <h3>Shared with Me Content</h3>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default UserDashboard;
