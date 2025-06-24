import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import '@study/navbar';

import App from './app/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
    {/* @ts-expect-error: Custom element type workaround for Nx/TS */}
    <custom-footer></custom-footer>
  </StrictMode>
);
