import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Ellipsis } from 'lucide-react';
import '../styles/Table.css';

const Table = ({ data }) => {
    const navigate = useNavigate();
    const [activeRow, setActiveRow] = useState(null);

    const handleEllipsisClick = (index) => {
        setActiveRow(activeRow === index ? null : index);
    };

    return (
        <table className="story-table">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Title</th>
                    <th>Writer</th>
                    <th>Category</th>
                    <th>Keyword</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.title}</td>
                        <td>{item.author}</td>
                        <td>{item.category}</td>
                        <td>
                            <div className="keywords">
                                {item.tags.map((tag, idx) => (
                                    <span key={idx} className="keyword-badge">{tag}</span>
                                ))}
                            </div>
                        </td>
                        <td>
                            <span className={`status-badge ${item.status.toLowerCase()}`}>
                                {item.status}
                            </span>
                        </td>
                        <td>
                            <Ellipsis onClick={() => handleEllipsisClick(index)} />
                            {activeRow === index && (
                                <div className="menu-buttons">
                                    <button onClick={() => navigate(`/stories/${item.id}/edit`)} className="edit-btn">
                                        Edit
                                    </button>
                                    <button onClick={() => navigate(`/stories/${item.id}/view`)} className="view-btn">
                                        View
                                    </button>
                                </div>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
