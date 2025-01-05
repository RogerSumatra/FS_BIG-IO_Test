import '../styles/Sidebar.css';
import logo from '../assets/logo.png';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <img className='logo' src={logo} />
            <ul className="menu">
                <li className="active">Story Management</li>
            </ul>
        </div>
    );
};

export default Sidebar;