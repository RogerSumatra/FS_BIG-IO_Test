import { useNavigate } from "react-router-dom";
import { Ellipsis } from 'lucide-react';
import '../styles/Table.css';

const Table = ({ data }) => {
    const navigate = useNavigate();

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
                        <td>{item.tags.join(', ')}</td>
                        <td className={item.status.toLowerCase()}>{item.status}</td>
                        <Ellipsis />
                        <td>
                            <button onClick={() => navigate(`/stories/${item.id}/edit`)}>
                                Edit
                            </button>
                            <button onClick={() => navigate(`/stories/${item.id}/view`)}>
                                View
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;