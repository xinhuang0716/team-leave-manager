import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import { LeaveProvider } from "./contexts/LeaveContext";
import MainLayout from "./layouts/MainLayout";
import CalendarPage from "./pages/CalendarPage";
import RecordsPage from "./pages/RecordsPage";
import AboutPage from "./pages/AboutPage";

const App = () => (
  <>
    <GlobalStyle />
    <Router>
      <LeaveProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<CalendarPage />} />
            <Route path="/records" element={<RecordsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </MainLayout>
      </LeaveProvider>
    </Router>
  </>
);

export default App;
