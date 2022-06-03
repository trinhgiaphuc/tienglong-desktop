import './index.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Template from './components/layout/Template';
import Sidebar from './components/layout/Sidebar';
import MainDashBoard from './components/layout/MainDashBoard';
import ProfilePage from './pages/profile';

function App() {
  return (
    <Template>
      <Sidebar />
      <ProfilePage />
      {/* <MainDashBoard /> */}
    </Template>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
