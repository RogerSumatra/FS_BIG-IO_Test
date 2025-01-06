import React, { useState } from 'react';
import { X } from 'lucide-react';
import '../styles/FilterModal.css';

const FilterPopup = ({ onClose, onFilter }) => {
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');

    const handleFilter = () => {
        onFilter({ category, status });
        onClose();
    };

    return (
        <div className="filter-popup">
            <div className="popup-content">
                <div className='popup-header'>
                    <h2>Filter</h2>
                    <button className="close-btn" onClick={onClose}><X /></button>

                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select Category</option>
                        <option value="Financial">Financial</option>
                        <option value="Technology">Technology</option>
                        <option value="Health">Health</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">Select Status</option>
                        <option value="Publish">Publish</option>
                        <option value="Draft">Draft</option>
                    </select>
                </div>
                <div className="button-group">
                    <button className="reset-btn" onClick={() => { setCategory(''); setStatus(''); }}>Reset</button>
                    <button className="cancel-btn" onClick={onClose}>Cancel</button>
                    <button className="filter-btn" onClick={handleFilter}>Filter</button>
                </div>
            </div>
        </div>
    );
};

export default FilterPopup;
