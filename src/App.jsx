import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import SignupPageUser from "./pages/auth/SignupPage.User";
import SignupPageDj from "./pages/auth/SignupPage.Dj";
import SignupPageDisco from "./pages/auth/SignupPage.Disco";
import SearchDiscoPage from "./pages/auth/SearchDiscoPage";
import ErrorPage from "./pages/ErrorPage";
import EventsListPage from "./pages/privates.routes/event/EventsListPage";
import EventCreatePage from "./pages/privates.routes/event/EventCreatePage";
import ProfilePage from "./pages/privates.routes/ProfilePage";
import Nav from "./components/Nav";
import { DiscoPage } from "./pages/privates.routes/disco/DiscoPage";
import { DjPage } from "./pages/privates.routes/dj/DjPage";
import EventDetailPage from "./pages/privates.routes/event/EventDetailPage";
import TracksPage from "./pages/privates.routes/playlist/TracksPage";
import PlaylistOfListPage from "./pages/privates.routes/playlist/PlaylistOfListPage";
import UserPageEdit from "./pages/privates.routes/user/UserPageEdit";
import OnBoardingPage from "./pages/OnBoardingPage";
import TypeOfUsersPage from "./pages/TypeOfUsersPage";

function App() {
  return (
    <ChakraProvider>
      <>
        <Nav />
        <Routes>
          <Route
            path="/events"
            element={
              <PrivateRoute>
                <EventsListPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-edit/:id"
            element={
              <PrivateRoute>
                <UserPageEdit />
              </PrivateRoute>
            }
          />

          <Route
            path="/disco/:discoId"
            element={
              <PrivateRoute>
                <DiscoPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/dj/:djId"
            element={
              <PrivateRoute>
                <DjPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/playlist/:eventId"
            element={
              <PrivateRoute>
                <TracksPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/playlists-list/:eventId"
            element={
              <PrivateRoute>
                <PlaylistOfListPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/events/create"
            element={
              <PrivateRoute>
                <EventCreatePage />
              </PrivateRoute>
            }
          />

          <Route
            path="/event/:id"
            element={
              <PrivateRoute>
                <EventDetailPage />
              </PrivateRoute>
            }
          />

          <Route path="/user-type" element={<TypeOfUsersPage />} />
          <Route path="/" element={<OnBoardingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signup/user" element={<SignupPageUser />} />
          <Route path="/signup/dj" element={<SignupPageDj />} />
          <Route path="/signup/disco" element={<SignupPageDisco />} />
          <Route path="/search/disco" element={<SearchDiscoPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </>
    </ChakraProvider>
  );
}

export default App;
