import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from './pages/Homepage';
import AddStoryPage from "./pages/AddStoryPage";

const App = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/stories/add" element={<AddStoryPage />} />
        </Routes>
      </Router>
    );
  };

export default App;