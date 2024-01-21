import { createRoot } from 'react-dom/client';
import { MainView } from './components/MainView/main-view';
import Container from 'react-bootstrap/Container';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import './index.scss';
import { StrictMode } from 'react';

// Main component (will eventually use all the others)
const App = () => {
  return (
    <Provider store={store}>
      <Container className="justify-content-center">
        <MainView />
      </Container>
    </Provider>
  );
};

// Finds the root of your app
const container = document.querySelector('#root');
const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
