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

    // State untuk story
    const [title, setTitle] = useState("");
    const [storyData, setStoryData] = useState({
        title: "",
        author: "",
        synopsis: "",
        category: "",
        tags: [],
        status: "",
    });

    // Handle adding tags
    const handleAddTag = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            if (tagInput.trim() && !tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput("");
        }
    };

    // Handle removing tags
    const handleRemoveTag = (tag) => {
        setTags(tags.filter((t) => t !== tag));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Gabungkan data yang akan dikirim
            const dataToSubmit = {
                ...storyData,
                tags: tags, // Tambahkan tags dari state
            };

            // Kirim data ke API
            await addStory(dataToSubmit);
            alert("Story and chapters saved successfully!");
            navigate("/"); // Navigasi ke halaman lain setelah sukses
        } catch (error) {
            console.error("Error saving story:", error.message);
            alert("Failed to save story and chapters");
        }
    };

    return (
        <div className="add-story-page">
            <Sidebar />
            {/* Main Content */}
            <div className="main-content">
                {/* Breadcrumb */}
                <p className="breadcrumb">
                    Stories Management &gt; Add Stories
                </p>

                {/* Page Title */}
                <h1 className="page-title">Add Stories</h1>

                {/* Back Button */}
                <Link to="/" className="back-button">Back</Link>

                {/* Content Box */}
                <div className="content-box">
                    <form onSubmit={handleSubmit}>
                        {/* Title and Writer Name */}
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

                        {/* Synopsis */}
                        <div className="form-group">
                            <label>Synopsis</label>
                            {/* <textarea name="synopsis" placeholder="Synopsis" rows="4" required></textarea> */}
                            <textarea
                                name="synopsis"
                                placeholder="Synopsis"
                                className="input-synopsis"
                                value={storyData.synopsis}
                                onChange={e => setStoryData({ ...storyData, synopsis: e.target.value })}
                                required
                            ></textarea>
                        </div>

                        {/* Category and Tags */}
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

                        {/* Cover Image and Status */}
                        <div className="form-row">
                            <div className="form-group">
                                <label>Cover Image</label>
                                <input className="input-left" type="file" accept="image/*" />
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <select
                                name="status"
                
                                required value={storyData.status}
                                onChange={e => setStoryData({ ...storyData, status: e.target.value })

                                }>
                                    <option value="Draft">Draft</option>
                                    <option value="Publish">Publish</option>
                                </select>
                            </div>
                        </div>

                        {/* Buttons */}
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
