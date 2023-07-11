import "./App.css";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import SignupPageUser from "./pages/auth/SignupPage.User";
import SignupPageDj from "./pages/auth/SignupPage.Dj";
import SignupPageDisco from "./pages/auth/SignupPage.Disco";
import SearchDiscoPage from "./pages/auth/SearchDiscoPage";
import ErrorPage from "./pages/ErrorPage";
import EventsListPage from "./pages/privates.routes/EventsListPage";
import DiscoDetailPage from "./pages/privates.routes/DiscoDetailPage";

function App() {
  return (
    <Routes>
      <Route
        path="/events"
        element={
          <PrivateRoute>
            <EventsListPage />
            <DiscoDetailPage />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signup/user" element={<SignupPageUser />} />
      <Route path="/signup/dj" element={<SignupPageDj />} />
      <Route path="/signup/disco" element={<SignupPageDisco />} />
      <Route path="/search/disco" element={<SearchDiscoPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
