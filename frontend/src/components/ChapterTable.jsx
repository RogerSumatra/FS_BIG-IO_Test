import '../styles/ChapterTable.css';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const ChapterTable = ({ data, storyId, isViewOnly = false }) => {
    const navigate = useNavigate();
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
                                <button onClick={() => navigate(`/stories/${storyId}/chapters/${item.id}/view`)}>
                                    View
                                </button>
                            ) : (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        navigate(`/stories/${storyId}/chapters/${item.id}/edit`);
                                    }}
                                >
                                    Edit
                                </button>
                            )}

                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ChapterTable;