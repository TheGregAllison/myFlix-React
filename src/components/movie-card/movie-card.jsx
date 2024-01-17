import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie, setUser, user }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('Favorite');
  const storedToken = localStorage.getItem('token');

  useEffect(() => {
    setIsFavorite(
      user.FavoriteMovies && user.FavoriteMovies.includes(movie._id)
    );
  }, [user, movie._id]);

  useEffect(() => {
    setButtonLabel(isFavorite ? 'Added' : 'Favorite');
  }, [isFavorite]);

  const handleFavoriteClick = async () => {
    try {
      console.log('Adding movie to favorites:', movie);
      const response = await fetch(
        `https://myflix-api-98798a311278.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        console.log('Response Data:', updatedUser);
        setIsFavorite((prevIsFavorite) => !prevIsFavorite);

        console.log('isFavorite state after update:', isFavorite);
        setUser(updatedUser);
      } else {
        console.error('Error adding to favorites:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  return (
    <Card className="d-flex h-100 rounded row p-1">
      <Card.Body className="rounded bg-dark bg-gradient w-100 mb-0 ">
        <Card.Img
          className="card-image-top rounded-bottom w-100"
          variant="top"
          src={movie.ImageUrl}
          style={{ cursor: 'pointer' }}
        />
        <Card.Title className="mt-3 light" style={{ cursor: 'pointer' }}>
          {movie.Title}
        </Card.Title>
        <Card.Text>{movie.ReleaseYear}</Card.Text>

        {!isFavorite && (
          <Button
            className="btn  position-absolute bottom-0 start-0 mb-1"
            variant="link"
            onClick={() => handleFavoriteClick(movie)}
            disabled={isFavorite}
          >
            {buttonLabel}
          </Button>
        )}
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button
            className="btn  position-absolute bottom-0 end-0 mb-1"
            variant="link"
          >
            Open
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImageUrl: PropTypes.string,
    Director: PropTypes.string.isRequired,
    ReleaseYear: PropTypes.string.isRequired,
    Description: PropTypes.string,
    Genre: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieCard;
