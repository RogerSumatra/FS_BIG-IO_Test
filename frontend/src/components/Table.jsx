/* eslint-disable react/prop-types */
import '../styles/Table.css';

const Table = ({ data }) => {
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
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;