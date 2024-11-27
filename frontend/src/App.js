import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// import pages & components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import UserWorkouts from "./pages/UserWorkouts";

function App() {
  const { user } = useAuthContext();

  // changes here (i have lost the count)
  let role = null;
  if(user){
    role = user.role
  }
  

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
            path="/admin"
            // element={!user ? <Navigate to="/login" /> : role === "admin" ? <Admin/> : <Navigate to="/" />}
            element={!user ? <Navigate to="/login" /> : role === "admin" ? <Admin/> : <Navigate to="/" />}
            />
            <Route
            path="/userWorkouts/:id"
            // element={role === "admin" ? <UserWorkouts/> : <Navigate to="/" />}
            element={!user ? <Navigate to="/login" /> : role === "admin" ? <UserWorkouts/> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
