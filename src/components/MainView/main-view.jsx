import React from 'react';
import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NavigationBar } from '../navigation-bar/nagivation-bar';
import ProfileView from '../profile-view/profile-view';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!storedToken) {
      console.error('Token is missing.');
      return;
    }

    setToken(storedToken);

    fetch('https://myflix-api-98798a311278.herokuapp.com/movies', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${storedToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Movies data from API:', data);

        const moviesFromApi = data.map((movie) => ({
          _id: movie._id,
          Title: movie.Title,
          Description: movie.Description,
          Genre: movie.Genre,
          Director: movie.Director,
          ReleaseYear: movie.ReleaseYear,
          ImageUrl: movie.ImageUrl,
        }));

        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          localStorage.clear();
        }}
      />
      <Row className="d-flex justify-content-center mt-4 mb-4">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
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
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    <h2>Movies</h2>
                    {movies.map((movie) => (
                      <Col className="d-flex wrap mb-4" key={movie._id} md={3}>
                        <MovieCard
                          movie={movie}
                          user={user}
                          setUser={setUser}
                          token={token}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/users/:username"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <ProfileView
                    user={user}
                    token={token}
                    setUser={setUser}
                    movies={movies}
                    onDelete={() => {
                      setUser(null);
                      setToken(null);
                      localStorage.clear();
                    }}
                  />
                )}
              </>
            }
          />
          <Route
            path="/users/:username/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col>
                    <ProfileView
                      token={token}
                      user={user}
                      movies={movies}
                      setUser={setUser}
                    />
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
