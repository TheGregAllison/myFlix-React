import { createRoot } from 'react-dom/client';
import { MainView } from './components/MainView/main-view';
import Container from "react-bootstrap/Container";
import './index.scss';


// Main component (will eventually use all the others)
const App = () => {
  return (
    <Container className="justify-content-center">
      <MainView />
    </Container>
  );
};

// Finds the root of your app
const container = document.querySelector('#root');
const root = createRoot(container);
root.render(<App />);
