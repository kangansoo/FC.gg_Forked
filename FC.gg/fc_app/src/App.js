import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SearchPage from './pages/SearchPage';
import ResultPage from './pages/ResultPage';
import Test from './pages/Test';
import ErrorPage from './pages/ErrorPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<><SearchPage/></>} />
        <Route path='/result' element={<><ResultPage/></>} />
        <Route path='/test' element={<><Test/></>} />
        <Route path='/*' element={<><ErrorPage/></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
