import { useState } from 'react';
import '../styles/Header.css';

const Header = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchText(value);
        onSearch(value); // Memanggil fungsi pencarian yang diberikan dari parent
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
            <button className="add-story-btn" >+ Add Story</button>
        </div>
    );
};

export default Header;
