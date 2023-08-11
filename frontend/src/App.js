import {
  BrowserRouter as Router,
  Route,
  Routes,
  // useNavigate,
} from "react-router-dom";
import './App.css';
import SignIn from './components/pages/signIn';
import SignUp from "./components/pages/SignUp";


function App() {
  return (
    <Router>
    <div className="App position-relative py-5 px-2">
      <div className="mb-5 pb-4">
        <div className="nav-container container-fluid rounded pe-0 fixed-top">
        </div>
      </div>
      <Routes>
        <Route
          path="/sign-up"
          element={
            <SignUp/>
          }
        />
        <Route
          path="/sign-in"
          element={
            <SignIn />
          }
        />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
