import { createRoot } from 'react-dom/client';
import { MainView } from "./components/MainView/main-view";
import "./index.scss";

// Main component (will eventually use all the others)
const App = () => {
  return <MainView />;
 };

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />); 