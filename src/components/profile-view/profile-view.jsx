import React from 'react';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import UserInfo from './user-info';
import { Container, Col, Form, Button } from 'react-bootstrap';
import FavoriteMovies from './favorite-movies';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducers/user';

export const ProfileView = () => {
  const movies = useSelector((state) => state.movies.list);
  const user = useSelector((state) => state.user);
  const userData = user.user;
  const token = user.token;
  const [username, setUsername] = useState(userData.Username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(userData.Email);
  const [BirthDate, setBirthDate] = useState(userData.BirthDate);
  const [favoriteMovies, setFavoriteMovies] = useState(userData.FavoriteMovies);
  const dispatch = useDispatch();

  const userBirthDate = Date.parse(BirthDate);

  console.log(userBirthDate);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user) {
          const response = await fetch(
            `https://myflix-api-98798a311278.herokuapp.com/users/${userData.Username}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const dataFromApi = await response.json();
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [token]);

  useEffect(() => {
    console.log('User Data:', userData);
    console.log('User Token:', token);
  }, [user]);

  const handleUpdate = (event) => {
    event.preventDefault();
    const isConfirmed = window.confirm(
      'Are you sure you want to update your account? This action cannot be undone.'
    );
    if (isConfirmed) {
      const updatedData = {
        Username: username,
        Password: password,
        Email: email,
        BirthDate: BirthDate,
      };

      fetch(
        `https://myflix-api-98798a311278.herokuapp.com/users/${userData.Username}`,
        {
          method: 'PUT',
          body: JSON.stringify(updatedData),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      ).then(async (response) => {
        if (response.ok) {
          const updatedUser = await response.json();
          alert('Account Updated!');
          localStorage.setItem('user', JSON.stringify(updatedUser));
          dispatch(setUser(updatedUser));
        } else {
          const errorMessage = await response.text();
          console.log(errorMessage);
          alert('Update failed.');
        }
      });
    }
  };

  const handleDelete = () => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );

    if (isConfirmed) {
      fetch(
        `https://myflix-api-98798a311278.herokuapp.com/users/${userData.Username}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((response) => {
        if (response.ok) {
          dispatch(setUser(null));
          alert('Your account has been deleted');
        } else {
          alert('Something went wrong.');
        }
      });
    }
  };

  return (
    <Container>
      <h1>Profile</h1>
      <UserInfo />
      <FavoriteMovies />
      <div className="d-flex justify-content-center">
        <Col md={5} className="text-center">
          <h2 className="profile-title">Update info</h2>
          <Form className="my-profile" onSubmit={handleUpdate}>
            <Form.Group className="mb-2" controlId="formUsername">
              <Form.Label>New Username:</Form.Label>
              <Form.Control
                type="text"
                value={userData.Username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formPassword">
              <Form.Label>New Password:</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formEmail">
              <Form.Label>New Email:</Form.Label>
              <Form.Control
                type="email"
                value={userData.Email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBirthday">
              <Form.Label>Update Birthday:</Form.Label>
              <div>
                <DatePicker
                  className="form-control"
                  selected={userBirthDate}
                  onChange={(date) => setBirthDate(date)}
                  dateFormat="MM-dd-yyyy"
                  showYearDropdown
                  required
                />
              </div>
            </Form.Group>

            <Button className="update m-2" type="submit" onClick={handleUpdate}>
              <strong></strong>Update
            </Button>
            <br></br>
            <Button
              className="delete m-2 btn btn-danger"
              onClick={handleDelete}
            >
              Delete Account
            </Button>
          </Form>
        </Col>
      </div>
    </Container>
  );
};
export default ProfileView;
