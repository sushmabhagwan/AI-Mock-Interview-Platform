import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import GenerateInterview from "./pages/GenerateInterview";
import InterviewHistory from "./pages/InterviewHistory";
import InterviewDetails from "./pages/InterviewDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import InterviewSession from "./pages/InterviewSession";
import Results from "./pages/Results";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
    path="/generate"
    element={<GenerateInterview />}
/>

<Route
    path="/history"
    element={<InterviewHistory />}
/>

<Route
  path="/results"
  element={
    <ProtectedRoute>
      <Results />
    </ProtectedRoute>
  }
/>

<Route
  path="/interview/:id"
  element={
    <ProtectedRoute>
      <InterviewDetails />
    </ProtectedRoute>
  }
/>

<Route
  path="/interview-session"
  element={
    <ProtectedRoute>
      <InterviewSession />
    </ProtectedRoute>
  }
/>

            </Routes>
        </BrowserRouter>
    );
}

export default App;