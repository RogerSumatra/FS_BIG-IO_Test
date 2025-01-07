import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChapterTable from "../components/ChapterTable";
import "../styles/EditStoryPage.css";
import { getChaptersByStoryId, getStoryById, updateStory } from "../api/api";

const EditStoryPage = () => {
    const { storyid } = useParams();
    const navigate = useNavigate();
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState("");

    const [storyData, setStoryData] = useState({
        title: "",
        author: "",
        synopsis: "",
        category: "",
        tags: [],
        status: "",
    });

    const [chapterData, setChapterData] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchChapter = async () => {
        try {
            const data = await getChaptersByStoryId(storyid);
            setChapterData(data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch chapter data.: ");
        }
    }

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const data = await getStoryById(storyid);
                setStoryData(data);
                setTags(data.tags);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch story data.: ");
            }
        };

        fetchStory();
        fetchChapter();
    }, [storyid]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStoryData({ ...storyData, [name]: value });
    };

    const handleAddTag = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            const newTag = tagInput.trim();
            if (newTag && !tags.includes(newTag)) {
                setTags([...tags, newTag]);
            }
            setTagInput("");
        }
    };

    const handleTagInputChange = (e) => {
        setTagInput(e.target.value);
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const updatedStoryData = { ...storyData, tags };
            await updateStory(storyid, updatedStoryData);
            alert("Story updated successfully!");
            navigate("/");
        } catch (err) {
            console.error(err);
            setError("Failed to update story.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="edit-story-page">
            <Sidebar />
            <div className="main-content">
                <p className="breadcrumb">
                    Stories Management &gt; Edit Stories
                </p>
                <h1 className="page-title">Edit Stories</h1>
                {error && <p className="error-message">{error}</p>}
                <Link to="/" className="back-button">Back</Link>
                <div className="content-box">
                    <form onSubmit={handleSave}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    className="input-left"
                                    placeholder="Title"
                                    value={storyData.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Writer Name</label>
                                <input
                                    type="text"
                                    name="author"
                                    placeholder="Writer Name"
                                    className="input-right"
                                    value={storyData.author}
                                    onChange={handleInputChange}
                                    required
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
                                onChange={handleInputChange}
                                required
                            ></textarea>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Category</label>
                                <select
                                    name="category"
                                    value={storyData.category}
                                    className="input-category"
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="Financial">Financial</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Health">Health</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Tags/Keywords</label>
                                <div className="tags-input">
                                    {tags.map((tag, index) => (
                                        <span key={index} className="tag" onClick={() => handleRemoveTag(tag)}>
                                            {tag} &times;
                                        </span>
                                    ))}
                                    <input
                                        type="text"
                                        placeholder="Add a tag"
                                        value={tagInput}
                                        onChange={handleTagInputChange}
                                        onKeyDown={handleAddTag}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Cover Image</label>
                                <input
                                    type="file"
                                    className="input-left"
                                    accept="image/*"
                                />
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <select
                                    name="status"
                                    value={storyData.status}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="Draft">Draft</option>
                                    <option value="Publish">Publish</option>
                                </select>
                            </div>
                        </div>
                        <div className="chapter-section">
                            <div className="chapter-button-placement">
                                <button type="button" className="add-chapter-button" onClick={() => navigate(`/stories/${storyid}/chapter`)}>
                                    + Add Chapter
                                </button>
                            </div>
                        </div>
                        <ChapterTable data={chapterData} storyId={storyid} onDeleteSuccess={fetchChapter} />
                        <div className="button-group">
                            <button
                                type="button"
                                className="cancel-button"
                                onClick={() =>
                                    window.confirm(
                                        "Are you sure you want to cancel adding the story without saving the data?"
                                    ) && navigate("/")
                                }
                            >
                                Cancel
                            </button>
                            <button type="submit" className="save-button">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditStoryPage;
