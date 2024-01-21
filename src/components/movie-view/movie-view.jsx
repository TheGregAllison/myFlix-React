import { useParams, Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './movie-view.scss';

export const MovieView = () => {
  const movies = useSelector((state) => state.movies.list);
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie._id === movieId);

  console.log('movies:', movies);
  console.log('movie:', movie);
  console.log('Movie ID:', movieId);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="d-flex justify-content-md-evenly">
      <Card className="mt-3 col-6">
        <Card.Img className="rounded" src={movie.ImageUrl} />
        <Card.Title className="mt-3 light">{movie.Title}</Card.Title>
        <Card.Text>{movie.ReleaseYear}</Card.Text>
        <Card.Text>Directed by {movie.Director}</Card.Text>
        <Card.Text>{movie.Description}</Card.Text>
        <Link to={'/'}>
          <Button
            className="back-button"
            variant="secondary"
            style={{ cursor: 'pointer' }}
          >
            Back
          </Button>
        </Link>
      </Card>
    </div>
  );
};
