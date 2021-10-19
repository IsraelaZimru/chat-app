import logo3 from '../images/chatImg.jfif'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store/user-slice';


const NavbarHome = () => {
    const userName = useSelector(state => state.user.name)
    const connected = useSelector(state => state.user.isLogin)
    const dispatch = useDispatch()

    const logout = () => {
        localStorage.clear();
        dispatch(userActions.userLogout())
    }

    return <Navbar bg="dark" variant="dark">
        <Navbar.Brand onClick={() => window.scrollTo(0, 0)}>
            {/* <Link to="/"> */}
            {/* <img src={logo3} style={{ height: '50px', width: '100px' }} alt="logo"></img> */}
            {/* </Link> */}
        </Navbar.Brand>
        <Nav className="mr-auto">
            {/* <Nav.Link>
                <Link to="/" style={{ color: "white" }}> Home Page </Link>
            </Nav.Link> */}
            <Nav.Link style={{ display: connected ? 'none' : 'block' }}>
                <Link to="/Sign_Up" style={{ color: "white" }}>Sign Up</Link>
            </Nav.Link>
            <Nav.Link style={{ display: connected ? 'none' : 'block' }}>
                <Link to="/Login" style={{ color: "white" }}>Login</Link>
            </Nav.Link>
        </Nav>

        <div
            style={{ display: connected ? 'block' : 'none', color: "white" }}
            className="mb-1 mr-2 wColor"
        >
            <Nav>
                <span style={{ color: "white", paddingRight: "15px" }}> Hello, <u> {userName}!</u></span>
                <span onClick={logout} style={{ color: "white", cursor: "pointer" }}>Logout</span>
            </Nav>
        </div>
    </Navbar >
}

export default NavbarHome;