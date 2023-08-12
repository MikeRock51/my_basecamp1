import {
  BrowserRouter as Router,
  Route,
  Routes,
  // useNavigate,
} from "react-router-dom";
import "./App.css";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Home from "./components/pages/Home";
import CreateProject from "./components/pages/CreateProject";
import UserDashboard from "./components/pages/UserDashboard";

function App() {
  return (
    <Router>
      <div className="App position-relative pb-5 pt-2 px-2">
        {/* <div className="mb-5 pb-4">
          <div className="nav-container container-fluid rounded pe-0 fixed-top"></div>
        </div> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/projects/new" element={<CreateProject />} />
          <Route path="/projects/dashboard" element={<UserDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
