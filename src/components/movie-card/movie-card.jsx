import { Button, Card } from 'react-bootstrap';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100 rounded row p-1 ">
      <Card.Body className="rounded bg-dark bg-gradient w-100 mb-0 ">
        <Card.Img className="card-image-top rounded-bottom w-100" onClick={() => onMovieClick(movie)} src={movie.ImageUrl} style={{ cursor: 'pointer' }} />
        <Card.Title className="mt-3 light"  onClick={() => onMovieClick(movie)} style={{ cursor: 'pointer' }}>{movie.Title}</Card.Title>
        <Card.Text>{movie.ReleaseYear}</Card.Text>
        <Button className="btn  position-absolute bottom-0 end-0 mb-1" variant="link" onClick={() => onMovieClick(movie)}>open</Button>
      </Card.Body>
    </Card>
  );
};
