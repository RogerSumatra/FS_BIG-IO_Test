import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addStory } from "../api/api";
import Sidebar from "../components/Sidebar";
import "./../styles/AddStoryPage.css";

const AddStoryPage = () => {
    const navigate = useNavigate();
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState("");

    const [storyData, setStoryData] = useState({
        title: "",
        author: "",
        synopsis: "",
        category: "",
        tags: [],
        status: "",
        coverImage: "",
    });

    const handleAddTag = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            if (tagInput.trim() && !tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput[0].toUpperCase() + tagInput.substring(1).trim()]);
            }
            setTagInput("");
        }
    };

    const handleRemoveTag = (tag) => {
        setTags(tags.filter((t) => t !== tag));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("coverImage", selectedFile);
            formData.append("title", storyData.title);
            formData.append("author", storyData.author);
            formData.append("synopsis", storyData.synopsis);
            formData.append("category", storyData.category);
            formData.append("tags", tags);
            formData.append("status", storyData.status);

            const response = await addStory(formData);
            const storyId = response.story.id;

            alert("Story and cover image saved successfully!");
            navigate(`/stories/${storyId}/chapter`);

        } catch (error) {
            console.error("Error saving story:", error.message);
            alert("Failed to save story and cover image");
        }
    };

    return (
        <div className="add-story-page">
            <Sidebar />
            <div className="main-content">
                <p className="breadcrumb">
                    Stories Management &gt; Add Stories
                </p>
                <h1 className="page-title">Add Stories</h1>
                <Link to="/" className="back-button">Back</Link>
                <div className="content-box">
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    className="input-left"
                                    placeholder="Title"
                                    value={storyData.title}
                                    onChange={(e) => setStoryData({ ...storyData, title: e.target.value })}
                                    required
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
                                    onChange={(e) => setStoryData({ ...storyData, author: e.target.value })}
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
                                onChange={e => setStoryData({ ...storyData, synopsis: e.target.value })}
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
                                    onChange={e => setStoryData({ ...storyData, category: e.target.value })}
                                    required
                                >
                                    <option value="" selected disabled hidden>Select Category</option>
                                    <option value="Financial">Financial</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Health">Health</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Tags/Keywords</label>
                                <div className="tags-input">
                                    {tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="tag"
                                            onClick={() => handleRemoveTag(tag)}
                                        >
                                            {tag} &times;
                                        </span>
                                    ))}
                                    <input
                                        type="text"
                                        placeholder="Add a tag"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleAddTag}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Cover Image</label>
                                <input
                                    className="input-left"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                {previewImage && (
                                    <div className="image-preview">
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            style={{ width: '250px', height: 'auto', marginTop: '10px' }}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Status</label>
                                <select
                                    name="status"
                                    required value={storyData.status}
                                    onChange={e => setStoryData({ ...storyData, status: e.target.value })

                                    }>
                                    <option value="" selected disabled hidden>Choose Status</option>
                                    <option value="Draft">Draft</option>
                                    <option value="Publish">Publish</option>
                                </select>
                            </div>
                        </div>
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

export default AddStoryPage;
