import '../styles/Sidebar.css';
import { LibraryBig, Blocks } from 'lucide-react';
import logo from '../assets/logo.png';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <img className='logo' src={logo} />
            <ul className="menu">
                <li className="menu-item">
                    <div className='menu-content'>
                        <Blocks className="icon" />
                        <span>Dashboard</span>
                    </div>
                </li>
                <li className="menu-item active">
                    <div className='menu-content'>
                        <LibraryBig className="icon" />
                        <span>Story Management</span>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
