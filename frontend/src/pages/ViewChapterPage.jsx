import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getChapterById } from "../api/api";
import Sidebar from "../components/Sidebar";
import ToolbarEditor from "../components/ToolbarEditor";
import "./../styles/ViewChapterPage.css";

const ViewChapterPage = () => {
  const navigate = useNavigate();
  const { chapterid } = useParams(); // Ambil chapter ID dari URL

  // State untuk data chapter
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterContent, setChapterContent] = useState("");
  const [error, setError] = useState(null);

  // Ambil data chapter dari backend saat halaman dimuat
  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const data = await getChapterById(chapterid);
        setChapterTitle(data.chapterTitle); // Isi judul chapter dari data backend
        setChapterContent(data.chapterContent); // Isi konten chapter dari data backend
      } catch (err) {
        console.error(err);
        setError("Failed to fetch chapter data.");
      }
    };

    fetchChapter();
  }, [chapterid]);

  return (
    <div className="view-chapter-page">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        {/* Breadcrumb */}
        <p className="breadcrumb">
          Stories Management &gt; View Stories &gt; View Chapter
        </p>

        {/* Page Title */}
        <h1 className="page-title">View Chapter</h1>

        {/* Back Button */}
        <button className="back-button" onClick={() => navigate(-1)}>
          &lt; Back
        </button>

        {/* Content Box */}
        <div className="content-box">
          {/* Chapter Title */}
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              placeholder="Title"
              value={chapterTitle}
              readOnly // Input hanya untuk melihat
            />
          </div>

          {/* Story Viewer */}
          <div className="form-group">
            <label>Story</label>
            <ToolbarEditor
              value={chapterContent}
              onChange={() => {}} // Disable perubahan konten
              readOnly={true} // Set editor to view-only
            />
          </div>

          {/* Error Message */}
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ViewChapterPage;
