import { Route, Routes } from 'react-router-dom';
import About from './about';
import { Homepage } from './Homepage';
import CalculatorView from './components/calculator/CalculatorView';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/calculator" element={<CalculatorView />} />
      </Routes>
    </div>
  );
}

export default App;
