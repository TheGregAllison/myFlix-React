import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { setUser, updateUser } from '../../redux/reducers/user';
import { useSelector, useDispatch } from 'react-redux';

export const MovieCard = ({ movie }) => {
  const movies = useSelector((state) => state.movies.list);
  const user = useSelector((state) => state.user);
  const userData = user.user;
  const token = user.token;
  const favoriteMovies = userData.FavoriteMovies || [];
  const [isFavorite, setIsFavorite] = useState(() => {
    if (!userData.FavoriteMovies) {
      return false;
    }
    return userData.FavoriteMovies.includes(movie._id);
  });
  const [buttonLabel, setButtonLabel] = useState('FavoriteMovies');
  const dispatch = useDispatch();

  useEffect(() => {
    setIsFavorite(
      userData.FavoriteMovies && userData.FavoriteMovies.includes(movie._id)
    );

    // Fetch user data only if necessary (e.g., if userData is not available)
    if (!userData.FavoriteMovies) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            `https://myflix-api-98798a311278.herokuapp.com/users/${userData.Username}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const dataFromApi = await response.json();
          setIsFavorite(
            dataFromApi.FavoriteMovies?.includes(movie._id) || false
          );
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [userData, movie._id, token]);

  const handleFavoriteClick = async (username, movieId, token) => {
    try {
      setIsFavorite(
        userData.FavoriteMovies && userData.FavoriteMovies.includes(movie._id)
      );
      // console.log('BEFORE API CALL');
      // console.log('User Data:', user);
      // console.log('Movie ID:', movieId);
      // console.log('Adding/removing movie to/from favorites:', movieId);

      // Check if userData is defined and has the expected structure
      if (userData && userData.FavoriteMovies) {
        const response = await fetch(
          `https://myflix-api-98798a311278.herokuapp.com/users/${username}/movies/${movieId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log('AFTER API CALL');

        if (response.ok) {
          const updatedUser = await response.json();
          dispatch(updateUser({ user: updatedUser, token: user.token }));
          // console.log('AFTER STATE CHANGE');
          // console.log('User Data:', user);
        } else {
          console.error('Error adding to favorites:', response.statusText);
        }
        setIsFavorite((prevIsFavorite) => !prevIsFavorite);
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
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Card.Img
            className="card-image-top rounded-bottom w-100"
            variant="top"
            src={movie.ImageUrl}
            style={{ cursor: 'pointer' }}
          />
        </Link>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`} className='text-decoration-none'>
          <Card.Title className="mt-3 light" style={{ cursor: 'pointer' }}>
            {movie.Title}
          </Card.Title>
        </Link>
        <Card.Text>{movie.ReleaseYear}</Card.Text>

        {isFavorite ? null : (
          <Button
            className="btn position-absolute bottom-0 start-0 mb-1"
            variant="link"
            onClick={() =>
              handleFavoriteClick(userData.Username, movie._id, token)
            }
          >
            Favorite
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

export default MovieCard;
