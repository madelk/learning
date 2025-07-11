import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import '@study/navbar';

const root = ReactDOM.createRoot(
  document.querySelector('#root') as HTMLElement
);

root.render(
  <StrictMode>
    <BrowserRouter basename="/react">
      {/* @ts-expect-error: Custom element type workaround for Nx/TS */}
      <custom-navbar></custom-navbar>
      <App />
      {/* @ts-expect-error: Custom element type workaround for Nx/TS */}
      <custom-footer></custom-footer>
    </BrowserRouter>
  </StrictMode>
);
