import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from './pages/Homepage';
import AddStoryPage from "./pages/AddStoryPage";
import EditStoryPage from "./pages/EditStoryPage";
import AddChapterPage from "./pages/AddChapterPage";
import EditChapterPage from "./pages/EditChapterPage";
import AddChapterWithStory from "./pages/AddChapterWithStory"
import ViewStoryPage from "./pages/ViewStoryPage";
import ViewChapterPage from "./pages/ViewChapterPage";


const App = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/stories" element={<AddStoryPage />} />
          <Route path="/stories/:storyid/chapter" element={<AddChapterPage/>} />
          <Route path="/stories/stories-with-chapter" element={<AddChapterWithStory/>} />
          <Route path="/stories/:storyid/edit" element={<EditStoryPage />} />
          <Route path="/stories/:storyid/view" element={<ViewStoryPage />} />
          <Route path="/stories/:storyId/chapters/:chapterid/edit" element={<EditChapterPage />} />
          <Route path="/stories/:storyId/chapters/:chapterid/view" element={<ViewChapterPage />} />
        </Routes>
      </Router>
    );
  };

export default App;