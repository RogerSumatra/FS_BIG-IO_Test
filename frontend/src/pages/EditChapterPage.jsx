import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getChapterById, updateChapter } from "../api/api";
import Sidebar from "../components/Sidebar";
import ToolbarEditor from "../components/ToolbarEditor";
import "./../styles/EditChapterPage.css";

const EditChapterPage = () => {
    const navigate = useNavigate();
    const { chapterid } = useParams();
    const [chapterTitle, setChapterTitle] = useState("");
    const [chapterContent, setChapterContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChapter = async () => {
            try {
                const data = await getChapterById(chapterid);
                setChapterTitle(data.chapterTitle);
                setChapterContent(data.chapterContent);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch chapter data.");
            }
        };

        fetchChapter();
    }, [chapterid]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const chapterData = {
                newChapterTitle: chapterTitle,
                newChapterContent: chapterContent,
            };
            await updateChapter(chapterid, chapterData);

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
            <Sidebar />
            <div className="main-content">
                <p className="breadcrumb">
                    Stories Management &gt; Edit Stories &gt; <span className="ganti"> Edit Chapter </span>
                </p>
                <h1 className="page-title">Edit Chapter</h1>
                <button className="back-button" onClick={() => navigate(-1)}>
                    Back
                </button>
                <div className="content-box">
                    <form onSubmit={handleSubmit}>
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
