import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { ProfileListingPage } from "./components/ProfileListingPage";
import { ProfileDetails } from "./components/ProfileDetail";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile-list-page" element={<ProfileListingPage />} />
        <Route path="/profile" element={<ProfileDetails />} />
      </Routes>
    </div>
  );
}

export default App;
