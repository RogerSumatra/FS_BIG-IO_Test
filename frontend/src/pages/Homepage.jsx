import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ContentBox from '../components/ContentBox';
import Table from '../components/Table';
import '../styles/Homepage.css';

const Homepage = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/stories');
                if (!response.ok) {
                    throw new Error('Failed to fetch stories');
                }
                const result = await response.json();
                setData(result);
                setFilteredData(result); // Awalnya, data yang difilter adalah semua data
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStories();
    }, []);

    const handleSearch = (query) => {
        if (!query) {
            setFilteredData(data); // Jika input kosong, tampilkan semua data
        } else {
            const lowerQuery = query.toLowerCase();
            const filtered = data.filter(
                (item) =>
                    (item.title && item.title.toLowerCase().includes(lowerQuery)) ||
                    (item.author && item.author.toLowerCase().includes(lowerQuery))
            );
            setFilteredData(filtered);
        }
    };

    return (
        <div className="homepage">
            <Sidebar />
            <div className="main-content">
                <h1 className="page-title">Stories</h1>
                <ContentBox>
                    <Header onSearch={handleSearch} />
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p style={{ color: 'red' }}>{error}</p>
                    ) : (
                        <Table data={filteredData} />
                    )}
                </ContentBox>
            </div>
        </div>
    );
};

export default Homepage;
