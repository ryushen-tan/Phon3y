import { Provider } from "react-redux";
import { store } from "./store/store";
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <MemoryRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </MemoryRouter>,
);
