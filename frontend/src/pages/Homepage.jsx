import { useState, useEffect } from 'react';
import { deleteStoryById } from '../api/api';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ContentBox from '../components/ContentBox';
import FilterPopup from '../components/FilterModal';
import Table from '../components/Table';
import '../styles/Homepage.css';

const Homepage = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/stories');
                if (!response.ok) {
                    throw new Error('Failed to fetch stories');
                }
                const result = await response.json();
                setData(result);
                setFilteredData(result);
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
            setFilteredData(data);
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

    const handleFilter = ({ category, status }) => {
        const filtered = data.filter((item) => {
            const matchesCategory = category ? item.category === category : true;
            const matchesStatus = status ? item.status === status : true;
            return matchesCategory && matchesStatus;
        });
        setFilteredData(filtered);
    };

    const handleDelete = async (storyId) => {
        try {
            await deleteStoryById(storyId);
            const updatedData = data.filter((item) => item.id !== storyId);
            setData(updatedData);
            setFilteredData(updatedData);
        } catch (err) {
            console.error('Failed to delete story:', err.message);
        }
    };

    return (
        <div className="homepage">
            <Sidebar />
            <div className="main-content">
                <h1 className="page-title">Stories</h1>
                <ContentBox>
                    <Header onSearch={handleSearch} onOpenFilter={() => setIsFilterModalOpen(true)} />
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p style={{ color: 'red' }}>{error}</p>
                    ) : (
                        <Table data={filteredData} onDelete={handleDelete} />
                    )}
                </ContentBox>
            </div>
            {isFilterModalOpen && <FilterPopup onClose={() => setIsFilterModalOpen(false)} onFilter={handleFilter} />}
        </div>
    );
};

export default Homepage;
