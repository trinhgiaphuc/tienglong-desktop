import './index.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';

import { Sidebar, Template } from './components/layout';

import { ProfilePage, HomePage, LoginPage, FeedbackPage } from './pages';
import UserProvider, { useUser } from './lib/userContext';
import type { UserData, Word } from './typings';

const root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
  const { pathname } = useLocation();
  const [todayWords, setTodayWords] = React.useState<Word[]>([]);
  const { setUser, setStatus } = useUser();

  React.useEffect(() => {
    window.electron.ipcRenderer.sendMessage('get-today-words', []);
    window.electron.ipcRenderer.on('today-words', ({ todayWords }) =>
      setTodayWords(todayWords)
    );
    window.electron.ipcRenderer.on('user-data', (user: UserData) => {
      setUser(user);
      setStatus('authenticated');
    });
  }, []);

  return (
    <Template>
      {pathname === '/' ? null : <Sidebar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/main_window"
          element={<HomePage todayWords={todayWords} />}
        />
        <Route path="/me" element={<ProfilePage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
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
