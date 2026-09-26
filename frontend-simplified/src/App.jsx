import { useState } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  // Logged in = there is a user saved in localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("user") !== null,
  );

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <MainLayout
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
        }
      >
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route
          path="/jobs/:id"
          element={<JobPage isAuthenticated={isAuthenticated} />}
        />

        {/* Protected routes: only for logged-in users */}
        <Route
          path="/add-job"
          element={isAuthenticated ? <AddJobPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit-job/:id"
          element={isAuthenticated ? <EditJobPage /> : <Navigate to="/login" />}
        />

        {/* Only for logged-out users */}
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignupPage setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
};

export default App;
