import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addChapter } from "../api/api";
import Sidebar from "../components/Sidebar";
import ToolbarEditor from "../components/ToolbarEditor";
import "../styles/AddChapterPage.css";

const AddChapterPage = () => {
    const navigate = useNavigate();
    const { storyid } = useParams();
    const [chapterTitle, setChapterTitle] = useState("");
    const [chapterContent, setChapterContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const chapterData = {
                chapterTitle,
                chapterContent: chapterContent,
            };
            await addChapter(storyid, chapterData);

            navigate(`/stories/${storyid}/edit`);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || "Failed to add chapter.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-chapter-page">
            <Sidebar />
            <div className="main-content">
                <p className="breadcrumb">
                    Stories Management &gt; Add Stories &gt; Add Chapter
                </p>
                <h1 className="page-title">Add Chapter</h1>
                <button className="back-button" onClick={() => navigate(`/stories/${storyid}/edit`)}>
                    Back
                </button>
                <div className="content-box">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                placeholder="Title"
                                className="input-title"
                                value={chapterTitle}
                                onChange={(e) => setChapterTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Story</label>
                            <ToolbarEditor
                                value={chapterContent}
                                onChange={setChapterContent}
                            />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <div className="button-group">
                            <button
                                type="button"
                                className="cancel-button"
                                onClick={() =>
                                    window.confirm(
                                        "Are you sure you want to cancel without saving?"
                                    ) && navigate(`/stories/${storyid}/edit`)
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
