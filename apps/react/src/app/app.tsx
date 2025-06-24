import { Route, Routes } from 'react-router-dom';
import About from './about';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={
          <div>
            Woo! We got a website people! <span role="img" aria-label="party popper">🎉</span>
          </div>
        } />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
