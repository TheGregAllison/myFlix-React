import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import './movie-view.scss';

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m._id === movieId);

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
