/* eslint-disable react/prop-types */
import '../styles/ChapterTable.css';

const ChapterTable = ({ data }) => {
    return (
        <table className="chapter-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Last Updated</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.chapterTitle}</td>
                        <td>{item.updatedAt}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ChapterTable;