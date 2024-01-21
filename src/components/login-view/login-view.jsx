import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducers/user';
import { useNavigate } from 'react-router-dom';

export const LoginView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    try {
      const response = await fetch(
        'https://myflix-api-98798a311278.herokuapp.com/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      console.log('Login response:', responseData);

      if (responseData.user) {
        localStorage.setItem('user', JSON.stringify(responseData.user));
        localStorage.setItem('token', responseData.token);
        console.log('Action payload:', responseData);
        dispatch(
          setUser({ user: responseData.user, token: responseData.token })
        );
        console.log(responseData);
        navigate('/');
      } else {
        alert('No such user');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Something went wrong');
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="7"
          />
        </Form.Group>
        <Button className="bg-secondary mt-3" type="submit">
          Sign In
        </Button>
      </Form>
    </div>
  );
};
