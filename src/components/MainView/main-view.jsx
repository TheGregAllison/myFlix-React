import React from 'react';
import { useEffect } from 'react';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { Row, Col } from 'react-bootstrap';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from 'react-router-dom';
import { NavigationBar } from '../navigation-bar/nagivation-bar';
import ProfileView from '../profile-view/profile-view';
import { useSelector, useDispatch } from 'react-redux';
import { setMovies } from '../../redux/reducers/movies.js';
import { setUser } from '../../redux/reducers/user.js';
import { MoviesList } from '../movies-list/movies-list';

export const MainView = () => {
  const movies = useSelector((state) => state.movies.list);
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);
  const user = useSelector((state) => state.user);
  const userData = user.user;
  const token = user.token;
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Token in MainView:', token);
    console.log('User Data in MainView:', userData);
  }, [token, userData]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      if (!userData || !token) {
        // Check if user and token are not already set
        dispatch(setUser({ user: storedUser, token: storedToken }));
      }

      // Fetch movies only when both user and token are available
      fetchMovies(storedToken);
    }
  }, [userData, token]);

  const fetchMovies = (token) => {
    if (!token) {
      console.error('Token is missing.');
      return;
    }

    fetch('https://myflix-api-98798a311278.herokuapp.com/movies', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            Genre: movie.Genre,
            Director: movie.Director,
            ReleaseYear: movie.ReleaseYear,
            ImageUrl: movie.ImageUrl,
          };
        });
        dispatch(setMovies(moviesFromApi));
      });
  };

  return (
    <BrowserRouter>
      <NavigationBar />
      <Row className="d-flex justify-content-center mt-4 mb-4">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {token || userData ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={7} sm={9}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>{token || userData ? <Navigate to="/" /> : <LoginView />}</>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!token || !userData ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!token || !userData ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    <h2>Movies</h2>
                    <MoviesList />
                  </>
                )}
              </>
            }
          />
          <Route
            path="/users/:username"
            element={
              <>
                {!token || !userData ? (
                  <Navigate to="/login" replace />
                ) : (
                  <ProfileView />
                )}
              </>
            }
          />
          <Route
            path="/users/:username/movies/:movieId"
            element={
              <>
                {!token || !userData ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col>
                    <ProfileView />
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
