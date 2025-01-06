import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChapterTable from "../components/ChapterTable";
import "./../styles/ViewStoryPage.css";

// API functions
import { getChaptersByStoryId, getStoryById } from "../api/api";

const ViewStoryPage = () => {
    const { storyid } = useParams();
    const navigate = useNavigate();

    // State untuk data story
    const [storyData, setStoryData] = useState({
        title: "",
        author: "",
        synopsis: "",
        category: "",
        tags: [],
        status: "",
    });

    const [chapterData, setChapterData] = useState([]);
    const [error, setError] = useState(null); // Untuk menampilkan error jika ada

    // Ambil data story dan chapters dari backend saat halaman dimuat
    useEffect(() => {
        const fetchStory = async () => {
            try {
                const data = await getStoryById(storyid); // Ambil data story
                setStoryData(data); // Isi state dengan data dari backend
            } catch (err) {
                console.error(err);
                setError("Failed to fetch story data.");
            }
        };

        const fetchChapters = async () => {
            try {
                const data = await getChaptersByStoryId(storyid); // Ambil data chapters
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
            {/* Main Content */}
            <div className="main-content">
                {/* Breadcrumb */}
                <p className="breadcrumb">Stories Management &gt; View Story</p>

                {/* Page Title */}
                <h1 className="page-title">View Story</h1>
                {error && <p className="error-message">{error}</p>}

                {/* Back Button */}
                <button className="back-button" onClick={() => navigate(-1)}>
                    &lt; Back
                </button>

                {/* Content Box */}
                <div className="content-box">
                    {/* Title and Writer Name */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={storyData.title}
                                readOnly // Input hanya untuk melihat
                            />
                        </div>
                        <div className="form-group">
                            <label>Writer Name</label>
                            <input
                                type="text"
                                name="author"
                                placeholder="Writer Name"
                                value={storyData.author}
                                readOnly // Input hanya untuk melihat
                            />
                        </div>
                    </div>

                    {/* Synopsis */}
                    <div className="form-group">
                        <label>Synopsis</label>
                        <textarea
                            name="synopsis"
                            placeholder="Synopsis"
                            value={storyData.synopsis}
                            readOnly // Textarea hanya untuk melihat
                        ></textarea>
                    </div>

                    {/* Category and Tags */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Category</label>
                            <select
                                name="category"
                                value={storyData.category}
                                disabled // Tidak bisa diubah
                            >
                                <option value="">Select Category</option>
                                <option value="Financial">Financial</option>
                                <option value="Technology">Technology</option>
                                <option value="Health">Health</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Tags/Keywords</label>
                            <div className="tags-display">
                                {storyData.tags.map((tag, index) => (
                                    <span key={index} className="tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Cover Image and Status */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Cover Image</label>
                            {/* Simpan URL atau preview gambar jika ada */}
                            <input
                                type="text"
                                placeholder="Cover Image URL"
                                value="Cover image is not editable in view-only mode."
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>Status</label>
                            <select name="status" value={storyData.status} disabled>
                                <option value="Draft">Draft</option>
                                <option value="Publish">Publish</option>
                            </select>
                        </div>
                    </div>

                    {/* Chapter Section */}
                    <div className="chapter-section">
                        <h2>Chapters</h2>
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
