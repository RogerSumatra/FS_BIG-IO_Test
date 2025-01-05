import { Link } from "react-router-dom";
import { useState } from 'react';
import '../styles/Header.css';
import filter from '../assets/filter.png';

const Header = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchText(value);
        onSearch(value);
    };

    return (
        <div className="header">
            <input
                type="text"
                placeholder="Search by Writers / Title"
                value={searchText}
                onChange={handleSearchChange}
                className="search-box"
            />
            <div className="buttons-container">
                <button className="filter-btn">
                    <img className="filter-img" src={filter} alt="filter" />
                </button>
                <Link to="/stories/add" className="add-story-btn">+ Add Story</Link>
            </div>
        </div>
    );
};

export default Header;
