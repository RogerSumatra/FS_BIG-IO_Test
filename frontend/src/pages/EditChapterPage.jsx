import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getChapterById, updateChapter } from "../api/api";
import Sidebar from "../components/Sidebar";
import ToolbarEditor from "../components/ToolbarEditor";
import "./../styles/EditChapterPage.css";

const EditChapterPage = () => {
  const navigate = useNavigate();
  const { chapterid } = useParams(); // Ambil chapter ID dari URL

  // State untuk form
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterContent, setChapterContent] = useState("");
  const [loading, setLoading] = useState(false);
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Kirim data yang telah diedit ke backend
      const chapterData = {
        newChapterTitle: chapterTitle,
        newChapterContent: chapterContent,
      };
      await updateChapter(chapterid, chapterData);

      // Navigasi kembali setelah berhasil
      alert("Chapter updated successfully!");
      navigate(-1);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to update chapter.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-chapter-page">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        {/* Breadcrumb */}
        <p className="breadcrumb">
          Stories Management &gt; Edit Stories &gt; <span className="ganti"> Edit Chapter </span>
        </p>

        {/* Page Title */}
        <h1 className="page-title">Edit Chapter</h1>

        {/* Back Button */}
        <button className="back-button" onClick={() => navigate(-1)}>
          &lt; Back
        </button>

        {/* Content Box */}
        <div className="content-box">
          <form onSubmit={handleSubmit}>
            {/* Chapter Title */}
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                placeholder="Title"
                value={chapterTitle}
                onChange={(e) => setChapterTitle(e.target.value)}
                required
              />
            </div>

            {/* Story Editor */}
            <div className="form-group">
              <label>Story</label>
              <ToolbarEditor
                value={chapterContent}
                onChange={setChapterContent}
              />
            </div>

            {/* Error Message */}
            {error && <p className="error-message">{error}</p>}

            {/* Buttons */}
            <div className="button-group">
              <button
                type="button"
                className="cancel-button"
                onClick={() =>
                  window.confirm(
                    "Are you sure you want to cancel without saving?"
                  ) && navigate(-1)
                }
              >
                Cancel
              </button>
              <button
                type="submit"
                className="save-button"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditChapterPage;
