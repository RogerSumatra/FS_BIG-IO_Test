import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addChapter } from "../api/api";
import Sidebar from "../components/Sidebar";
import ToolbarEditor from "../components/ToolbarEditor";
import "./../styles/AddChapterPage.css";

const AddChapterPage = () => {
    const navigate = useNavigate();
    const { storyid } = useParams();

    // State untuk form
    const [chapterTitle, setChapterTitle] = useState("");
    const [chapterContent, setChapterContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Kirim data ke backend
            const chapterData = {
                chapterTitle,
                chapterContent: chapterContent,
            };
            await addChapter(storyid, chapterData);

            // Navigasi kembali setelah berhasil
            navigate(-1);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || "Failed to add chapter.");
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
                    Stories Management &gt; Add Stories &gt; Add Chapter
                </p>

                {/* Page Title */}
                <h1 className="page-title">Add Chapter</h1>

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

export default AddChapterPage;
