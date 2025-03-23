import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage";
import RecordsPage from "./pages/RecordsPage";
import AboutPage from "./pages/AboutPage";
import Sidebar from "./components/Sidebar";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<CalendarPage />} />
            <Route path="/records" element={<RecordsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
