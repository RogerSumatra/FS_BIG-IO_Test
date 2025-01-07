import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChapterTable from "../components/ChapterTable";
import "./../styles/ViewStoryPage.css";

import { getChaptersByStoryId, getStoryById } from "../api/api";

const ViewStoryPage = () => {
    const { storyid } = useParams();
    const navigate = useNavigate();

    const [storyData, setStoryData] = useState({
        title: "",
        author: "",
        synopsis: "",
        category: "",
        tags: [],
        status: "",
        coverImage: "",
    });

    const [chapterData, setChapterData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const data = await getStoryById(storyid);
                setStoryData(data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch story data.");
            }
        };

        const fetchChapters = async () => {
            try {
                const data = await getChaptersByStoryId(storyid);
                setChapterData(data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch chapter data.");
            }
        };

        fetchStory();
        fetchChapters();
    }, [storyid]);

    return (
        <div className="view-story-page">
            <Sidebar />
            <div className="main-content">
                <p className="breadcrumb">Stories Management &gt; View Story</p>
                <h1 className="page-title">View Story</h1>
                {error && <p className="error-message">{error}</p>}
                <button className="back-button" onClick={() => navigate(-1)}>
                    Back
                </button>
                <div className="content-box">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                className="input-left"
                                name="title"
                                placeholder="Title"
                                value={storyData.title}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>Writer Name</label>
                            <input
                                type="text"
                                name="author"
                                className="input-right"
                                placeholder="Writer Name"
                                value={storyData.author}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Synopsis</label>
                        <textarea
                            name="synopsis"
                            placeholder="Synopsis"
                            className="input-synopsis"
                            value={storyData.synopsis}
                            readOnly
                        ></textarea>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Category</label>
                            <select
                                name="category"
                                value={storyData.category}
                                className="input-category"
                                disabled
                            >
                                <option value="Financial">Financial</option>
                                <option value="Technology">Technology</option>
                                <option value="Health">Health</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Tags/Keywords</label>
                            <div className="tags-input">
                                {storyData.tags.map((tag, index) => (
                                    <span key={index} className="tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Cover Image</label>
                            <div className="image-preview">
                                <img
                                    src={storyData.coverImage}
                                    alt="Preview"
                                    style={{ width: '250px', height: 'auto', marginTop: '10px' }}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Status</label>
                            <select name="status" value={storyData.status} disabled>
                                <option value="Draft">Draft</option>
                                <option value="Publish">Publish</option>
                            </select>
                        </div>
                    </div>
                    <div className="chapter-section">
                        <ChapterTable
                            data={chapterData}
                            storyId={storyid}
                            isViewOnly={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewStoryPage;
