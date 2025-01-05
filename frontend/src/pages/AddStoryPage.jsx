import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addStory } from "../api/api";
import Sidebar from "../components/Sidebar";
import ChapterTable from "../components/ChapterTable";
import "./../styles/AddStoryPage.css";

const AddStoryPage = () => {
    const navigate = useNavigate();
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState("");

    const Data = [
        { chapterTitle: 'lmao', updatedAt: '2022-01-01' }
    ];

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

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Ambil data dari form
        const storyData = {
            title: e.target.title.value,
            author: e.target.author.value,
            synopsis: e.target.synopsis.value,
            category: e.target.category.value,
            tags: tags,
            status: e.target.status.value,
        };
    
        try {
            // Kirim data ke backend menggunakan API handler
            const response = await addStory(storyData);
            console.log("Story successfully added:", response);
    
            // Navigasi ke halaman lain (misalnya, halaman daftar cerita)
            navigate("/");
        } catch (error) {
            console.error("Failed to add story:", error.message);
            alert(error.message || "Failed to add story");
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
                <Link to="/">Back</Link>

                {/* Content Box */}
                <div className="content-box">
                    <form onSubmit={handleSubmit}>
                        {/* Title and Writer Name */}
                        <div className="form-row">
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" name="title" placeholder="Title" required />
                            </div>
                            <div className="form-group">
                                <label>Writer Name</label>
                                <input type="text" name="author" placeholder="Writer Name" required />
                            </div>
                        </div>

                        {/* Synopsis */}
                        <div className="form-group">
                            <label>Synopsis</label>
                            <textarea name="synopsis" placeholder="Synopsis" rows="4" required></textarea>
                        </div>

                        {/* Category and Tags */}
                        <div className="form-row">
                            <div className="form-group">
                                <label>Category</label>
                                <select name="category" required>
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
                                <input type="file" accept="image/*"/>
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <select name="status" required>
                                    <option value="Draft">Draft</option>
                                    <option value="Publish">Publish</option>
                                </select>
                            </div>
                        </div>

                        {/* Chapter Section */}
                        <div className="chapter-section">
                            <div className="shit">
                            <button
                                type="button"
                                className="add-chapter-button"

                            >
                                + Add Chapter
                            </button>
                            </div>
                        </div>

                        <ChapterTable data={Data} />

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
