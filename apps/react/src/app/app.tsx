import { Route, Routes } from 'react-router-dom';
import About from './about';
import { Homepage } from './Homepage';


export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={
         <Homepage />
        } />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
