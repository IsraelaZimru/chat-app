import logo3 from '../images/chatImg.jfif'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";



const NavbarHome = ({ connected, user }) => {

    return <Navbar bg="dark" variant="dark">
        <Navbar.Brand onClick={() => window.scrollTo(0, 0)}>
            <Link to="/">
                <img src={logo3} style={{ height: '50px', width: '100px' }} alt="logo"></img>
            </Link>
        </Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link>
                <Link to="/"> Home Page </Link>
            </Nav.Link>
            <Nav.Link style={{ display: connected ? 'none' : 'block' }}>
                <Link to="/Sign_Up">Sign Up</Link>
            </Nav.Link>
            <Nav.Link style={{ display: connected ? 'none' : 'block' }}>
                <Link to="/Login">Login</Link>
            </Nav.Link>
        </Nav>

        {/* <Nav.Link style={{ display: connected ? 'block' : 'none' }}> */}
        <Nav.Link >
            <Link >Logout</Link>
        </Nav.Link>
    </Navbar>
}

export default NavbarHome;