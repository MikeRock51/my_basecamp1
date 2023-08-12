import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Switch from "react-switch";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import axios from "axios";

function EditProject() {
  const location = useLocation();
  const navigate = useNavigate();
  const projectData = location.state.projectData;

  const [formData, setFormData] = useState({
    name: projectData.name,
    description: projectData.description,
    member: {
      email: "",
      isAdmin: false,
    },
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleToggleChange(checked) {
    setFormData((prevData) => ({
      ...prevData,
      member: {
        ...prevData.member,
        isAdmin: checked,
      },
    }));
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      await axios.put(
        `http://13.48.5.194:8000/api/v1/projects/${projectData.id}`,
        formData
      );
      navigate('/projects/dashboard', {
        state: {
            prev: location.pathname,
            action: "Update"
        }
      });
    } catch (error) {
        console.log(error.response?.data?.Error || "An error occurred!");
    }
  }

  return (
    <Container className="py-5 position-relative">
      <div
        className="position-absolute top-0 end-0 m-3 text-danger"
        style={{ cursor: "pointer" }}
      >
        <FaTrash
          size={20}
          // onClick={handleDelete}
        />
        <p>Delete Project</p>
      </div>
      <h2 className="mb-4 text-primary">Edit Project</h2>
      <Form onSubmit={handleUpdate}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={{ border: "1.5px solid" }}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            style={{ border: "1.5px solid" }}
          />
        </Form.Group>
        <Form.Group controlId="member">
          <Form.Label>Add Member (email)</Form.Label>
          <Row>
            <Col xs={8}>
              <Form.Control
                type="email"
                name="email"
                value={formData.member.email}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    member: {
                      ...prevData.member,
                      email: e.target.value,
                    },
                  }))
                }
                required
                style={{ border: "1.5px solid" }}
              />
            </Col>
            <Col xs={4} className="d-flex align-items-center">
              <span className="mr-2">Admin</span>
              <Switch
                checked={formData.member.isAdmin}
                onChange={handleToggleChange}
                onColor="#007bff"
                onHandleColor="#ffffff"
                offColor="#d3d3d3"
                offHandleColor="#ffffff"
                width={48}
                height={24}
              />
            </Col>
          </Row>
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Update Project
        </Button>
      </Form>
    </Container>
  );
}

export default EditProject;
