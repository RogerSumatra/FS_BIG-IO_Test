import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Ellipsis } from 'lucide-react';
import "../styles/ChapterTable.css";
import moment from 'moment';
import { deleteChapterById } from "../api/api";


const ChapterTable = ({ data, storyId, isViewOnly = false, onDeleteSuccess }) => {
    const navigate = useNavigate();
    const [activeRow, setActiveRow] = useState(null);

    const handleEllipsisClick = (index) => {
        setActiveRow(activeRow === index ? null : index);
    };

    const handleClickOutside = (event) => {
        if (!event.target.closest('.menu-buttons') && !event.target.closest('.ellipsis-icon')) {
            setActiveRow(null);
        }
    };

    const handleDeleteChapter = async (chapterId) => {
        if (window.confirm("Are you sure you want to delete this chapter?")) {
            try {
                await deleteChapterById(chapterId);
                alert('Chapter deleted successfully!');
                onDeleteSuccess();
            } catch (error) {
                console.error(error);
                alert('Failed to delete chapter.');
            }
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <table className="chapter-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Last Updated</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.chapterTitle}</td>
                        <td>{moment(item.updatedAt).format('DD MMMM YYYY')}</td>
                        <td>
                            {isViewOnly ? (
                                <button
                                    onClick={() => navigate(`/stories/${storyId}/chapters/${item.id}/view`)}
                                    className='view-btn'>
                                    View
                                </button>
                            ) : (
                                <>
                                    <Ellipsis
                                        onClick={() => handleEllipsisClick(index)}
                                        className="ellipsis-icon"
                                    />
                                    {activeRow === index && (
                                        <div className="menu-buttons">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    navigate(`/stories/${storyId}/chapters/${item.id}/edit`);
                                                }}
                                                className='edit-btn'
                                            >
                                                Edit
                                            </button>
                                            <button onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                handleDeleteChapter(item.id);
                                            }} className="delete-btn">
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}

                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ChapterTable;