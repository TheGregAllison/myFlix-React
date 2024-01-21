import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { clearUser } from '../../redux/reducers/user';
import { useNavigate } from 'react-router-dom';

export const NavigationBar = () => {
  const user = useSelector((state) => state.user);
  const userData = user.user;
  const token = user.token;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (user) => {
    console.log('Logging out...');
    dispatch(clearUser());
    console.log('User state after logout:', user);
    navigate('/login');
    console.log('Navigated to /login');
  };

  return (
    <Navbar className="navbar navbar-dark bg-dark" expand="lg">
      <Container>
        <Navbar.Brand className="fs-2 text-secondary" as={Link} to="/">
          myFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="fs-5 ms-auto">
            {!token ? ( // User is not logged in
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            ) : (
              // User is logged in
              <>
                {userData &&
                  userData.Username && ( // Check if userData exists before accessing properties
                    <Nav.Link as={Link} to={`/users/${userData.Username}`}>
                      Profile
                    </Nav.Link>
                  )}
                <Nav.Link as={Link} to="/">
                  Movies
                </Nav.Link>
                <Nav.Link onClick={() => handleLogout(user)}>Logout</Nav.Link>

              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
