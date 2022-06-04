import './index.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';

import { Sidebar, Template } from './components/layout';

import { ProfilePage, HomePage, LoginPage } from './pages';
import UserProvider from './lib/userContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
  const { pathname } = useLocation();

  return (
    <Template>
      {pathname === '/' ? null : <Sidebar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main_window" element={<HomePage />} />
        <Route path="me" element={<ProfilePage />} />
      </Routes>
    </Template>
  );
}

root.render(
  <HashRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </HashRouter>
);
