import { Link } from "react-router-dom";
import { useContext } from "react";
import './Nav.css'
import { AuthContext } from "../../providers/AuthProvider";

// function Nav() {
//     return (
//         <nav>
//             <Link to="/"> Home </Link>
//             <Link to="/project">Project</Link>
//             <Link to="/about">About</Link>
//         </nav>
//     );
// }

function Nav(props) {
    // const { loggedIn, setLoggedIn } = props
    const { loggedIn, setToken } = useContext(AuthContext)

    const handleClick = () => {
        window.localStorage.removeItem("token")
        setToken(null)
    }
    return (
        <nav>
            <div>
                {!loggedIn && <Link to="/login" className="btn">Login</Link>}
                {!loggedIn && <Link to="/register" className="btn">Register</Link>}
                {loggedIn && <button onClick={handleClick}>Log Out</button>}

                <div id="nav-controls">
                    <Link to="/"> Home </Link>
                    <Link to="/projects"> Project </Link>
                    <Link to="/create-project">Create Project</Link>
                    <Link to="/about"> About </Link>
                </div>
            </div>

        </nav>
    );
}

export default Nav;