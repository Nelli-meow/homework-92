import  './App.css';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './features/users/RegisterPage.tsx';
import LoginPage from './features/users/LoginPage.tsx';
import MainPage from './containers/MainPage.tsx';
import Header from './components/Header/Header.tsx';

const App = () => {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="*" element={<p className="text-center">Page is not  found</p>} />
      </Routes>
    </>
  );
};

export default App;
