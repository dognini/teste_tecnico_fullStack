import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/campos" className="nav-link">Campos</Link>
                <Link to="/preenchimentos" className="nav-link">Preenchimentos</Link>
            </div>
        </nav>
    );
};

export default Navbar;