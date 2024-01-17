import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import UserInfo from './user-info';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import FavoriteMovies from './favorite-movies';

export const ProfileView = ({ user, movies, setUser, token }) => {
  const [username, setUsername] = useState(user.Username || '');
  const [password, setPassword] = useState(user.Password || '');
  const [email, setEmail] = useState(user.Email || '');
  const [birthday, setBirthday] = useState(user.Birthday || '');
  const [favoriteMovies, setFavoriteMovies] = useState(
    user.FavoriteMovies || []
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://myflix-api-98798a311278.herokuapp.com/users/${user.Username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userData = await response.json();
        setFavoriteMovies(userData.FavoriteMovies || []);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user.Username, token]);

  useEffect(() => {
    console.log('User:', user);
    console.log('Favorite Movies:', favoriteMovies);
  }, [user, favoriteMovies]);

  const handleUpdate = (event) => {
    event.preventDefault();

    const updatedData = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch(
      `https://myflix-api-98798a311278.herokuapp.com/users/${user.Username}`,
      {
        method: 'PUT',
        body: JSON.stringify(updatedData),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(async (response) => {
        console.log(response);
        if (response.ok) {
          response.json();
          alert('Account Updated!');
        } else {
          const e = await response.text();
          console.log(e);
          alert('Update failed.');
        }
      })
      .then((updatedUser) => {
        if (updatedUser) {
          localStorage.setItem('user', JSON.stringify(updatedUser));
          console.log('Current User State:', user);
          setUser(updatedUser);
          console.log('Updated User State:', updatedUser);
        }
      });
  };

  const handleDelete = () => {
    const isConfirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
  
    if (isConfirmed) {
      fetch(
        `https://myflix-api-98798a311278.herokuapp.com/users/${user.Username}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((response) => {
        if (response.ok) {
          setUser(null);
          alert('Your account has been deleted');
        } else {
          alert('Something went wrong.');
        }
      });
    }
  };

  return (
    <Container>
      <UserInfo username={user.Username} email={user.Email} />
      <FavoriteMovies
        FavMovies={user.FavoriteMovies}
        user={user}
        token={token}
        setUser={setUser}
        movies={movies}
      />
      <div className="d-flex justify-content-center">
        <Col md={5} className="text-center">
          <h2 className="profile-title">Update info</h2>
          <Form className="my-profile" onSubmit={handleUpdate}>
            <Form.Group className="mb-2" controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </Form.Group>

            <Button className="update m-2" type="submit" onClick={handleUpdate}>
              <strong></strong>Update
            </Button>
            <br></br>
            <Button className="delete m-2 btn btn-danger" onClick={handleDelete}>
            Delete Account
            </Button>
          </Form>
        </Col>
      </div>
    </Container>
  );
};
export default ProfileView;
