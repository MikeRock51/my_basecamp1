import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container className="py-5 text-center">
      <h1 className='display-1 fw-semibold'>COLLABORATE</h1>
      <p>A project management tool for developers</p>
      <div className="my-5">
        <Link to="/sign-up">
          <Button variant="primary" className="mx-3">
            Sign Up
          </Button>
        </Link>
        <Link to="/sign-in">
          <Button variant="primary" className="mx-3">
            Log In
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default Home;
