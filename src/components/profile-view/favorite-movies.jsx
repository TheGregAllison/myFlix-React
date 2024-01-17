import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import MovieCard from '../movie-card/movie-card';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const FavoriteMovies = ({ FavMovies, user, setUser, movies }) => {
  const [filteredMovies, setFilteredMovies] = useState(
    FavMovies ? movies.filter((movie) => FavMovies.includes(movie._id)) : []
  );

  const handleRemoveFav = async (user, movie) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Removing movie from favorites:', movie._id);

      const response = await fetch(
        `https://myflix-api-98798a311278.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const updatedUser = await response.json();
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);

        // Update filteredMovies by excluding the removed movie
        const updatedFilteredMovies = filteredMovies.filter(
          (filteredMovie) => filteredMovie._id !== movie._id
        );

        setFilteredMovies(updatedFilteredMovies);
      } else {
        alert('Movie could not be removed');
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  return (
    <>
      <h2 className="mt-4">Favorite Movies</h2>
      {filteredMovies.length === 0 ? (
        <p>No favorited movies.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-4 g-1">
          {filteredMovies.map((movie) => (
            <Col key={movie._id} className="mb-4">
              <Card className="p-1 h-100">
                <Card.Body className="rounded bg-dark bg-gradient w-100 mb-0">
                  <Card.Img
                    className="card-image-top rounded-bottom w-100"
                    variant="top"
                    src={movie.ImageUrl}
                    style={{ cursor: 'pointer' }}
                  />
                  <Card.Title
                    className="mt-3 light"
                    style={{ cursor: 'pointer' }}
                  >
                    {movie.Title}
                  </Card.Title>
                  <Card.Text>{movie.ReleaseYear}</Card.Text>
                  <Button
                    className="btn position-absolute bottom-0 start-0 mb-1"
                    variant="link"
                    onClick={() => handleRemoveFav(user, movie)}
                  >
                    Remove
                  </Button>
                  <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                    <Button
                      className="btn position-absolute bottom-0 end-0 mb-1"
                      variant="link"
                    >
                      Open
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </div>
      )}
    </>
  );
};

export default FavoriteMovies;
