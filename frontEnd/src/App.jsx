import { Routes, Route } from 'react-router-dom';
import './App.css';

/**Pages */
import Tools from './pages/Tools';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Tutorial from './pages/Tutorial';
import Register from './pages/Register';

function App() {
  return (
    <>
      {/** Routes to pages  */}
      <Routes>
        <Route index element={<Tools />} />
        <Route path="login" element={<Login />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="tutorial" element={<Tutorial />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
