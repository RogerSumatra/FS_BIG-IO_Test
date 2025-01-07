import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getChapterById } from "../api/api";
import Sidebar from "../components/Sidebar";
import ToolbarEditor from "../components/ToolbarEditor";
import "./../styles/ViewChapterPage.css";

const ViewChapterPage = () => {
    const navigate = useNavigate();
    const { chapterid } = useParams();

    const [chapterTitle, setChapterTitle] = useState("");
    const [chapterContent, setChapterContent] = useState("");
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

    return (
        <div className="view-chapter-page">
            <Sidebar />
            <div className="main-content">
                <p className="breadcrumb">
                    Stories Management &gt; View Stories &gt; View Chapter
                </p>
                <h1 className="page-title">View Chapter</h1>
                <button className="back-button" onClick={() => navigate(-1)}>
                    Back
                </button>
                <div className="content-box">
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            placeholder="Title"
                            className="input-title"
                            value={chapterTitle}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label>Story</label>
                        <ToolbarEditor
                            value={chapterContent}
                            onChange={() => { }}
                            readOnly={true}
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default ViewChapterPage;
