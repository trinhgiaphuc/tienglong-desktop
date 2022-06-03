import './index.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { MainDashBoard, Sidebar, Template } from './components/layout';

import ProfilePage from './pages/profile';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Template>
    <HashRouter>
      <Sidebar />
      <Routes>
        <Route path="/main_window" element={<MainDashBoard />}></Route>
        <Route path="me" element={<ProfilePage />}></Route>
      </Routes>
    </HashRouter>
  </Template>
);
