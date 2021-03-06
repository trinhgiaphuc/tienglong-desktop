import "./index.css";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  HashRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { Sidebar, Template } from "./components/layout";

import {
  // AdminPage,
  DefinePage,
  FeedbackPage,
  HomePage,
  LoginPage,
  ProfilePage,
} from "./pages";
import UserProvider, { useUser } from "./lib/userContext";
import type { TodayWords, UserDetails, Word, TrendingWords } from "./typings";
import SpecificWordPage from "./pages/specific-word";

const root = ReactDOM.createRoot(document.getElementById("root"));
function App() {
  const { pathname } = useLocation();
  const [todayWords, setTodayWords] = React.useState<Word[]>([]);
  const [trendingWords, setTrendingWords] = React.useState<Word[]>([]);

  const { setUser, setStatus } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    window.electron.ipcRenderer.sendMessage("get-today-words", []);
    window.electron.ipcRenderer.sendMessage("get-trending-words", []);

    window.electron.ipcRenderer.on(
      "today-words",
      ({ todayWords }: TodayWords) => {
        setTodayWords(todayWords);
      },
    );
    window.electron.ipcRenderer.on(
      "trending-words",
      ({ trendingWords }: TrendingWords) => {
        setTrendingWords(trendingWords);
      },
    );

    window.electron.ipcRenderer.on(
      "user-data",
      ({ user }: { user: UserDetails }) => {
        if (user) {
          setUser(user);
          setStatus("authenticated");
          navigate("/main_window");
        }
      },
    );
  }, []);

  return (
    <Template>
      {pathname === "/" ? null : <Sidebar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/main_window"
          element={<HomePage todayWords={todayWords} trendingWords={trendingWords} />}
        />
        <Route path="/word/:wordId" element={<SpecificWordPage />} />
        <Route path="/user/:userId" element={<ProfilePage />} />
        <Route path="/me" element={<ProfilePage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        {/* <Route path="/admin" element={<AdminPage />} /> */}
        <Route path="/define" element={<DefinePage />} />
      </Routes>
    </Template>
  );
}

root.render(
  <HashRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </HashRouter>,
);
