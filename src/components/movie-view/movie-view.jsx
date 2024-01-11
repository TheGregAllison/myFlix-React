import './movie-view.scss';
import { Card, Button } from 'react-bootstrap';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div className="d-flex justify-content-md-evenly">
      <Card className="mt-3 col-6">
        <Card.Img className="rounded" src={movie.ImageUrl} />
        <Card.Title className="mt-3 light">{movie.Title}</Card.Title>
        <Card.Text>{movie.ReleaseYear}</Card.Text>
        <Card.Text>Directed by {movie.Director}</Card.Text>
        <Card.Text>{movie.Description}</Card.Text>

        <Button
          onClick={onBackClick}
          className="back-button"
          variant="secondary"
          style={{ cursor: 'pointer' }}
        >
          Back
        </Button>
      </Card>
    </div>
  );
};
