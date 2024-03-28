import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<><SearchPage/></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
