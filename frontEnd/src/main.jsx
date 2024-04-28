import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthenticationProvider } from './context/AuthenticationContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthenticationProvider>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </AuthenticationProvider>
);
