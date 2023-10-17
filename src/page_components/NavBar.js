import "../css/navbar.css";
import InfoFlowIcon from "../assets/LOGO.png";
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";

export default function NavBar() {
    return (
        <div className="nav_bar_wrapper">
        <header>
            <Link to="/HomePage">
            <img className="logo" src={InfoFlowIcon} alt="logo"></img>
            </Link>
        <nav>
        <ul className="nav_bar">
            <li>
                <Link to="/About">
                <div className="nav_about">About</div>
                </Link>
            </li>
            <li>
            <Link to="/Contact">
                <div className="nav_about">Contact</div>
                </Link>
            </li>
            <li>
            <Link to="/Login">
                <div className="nav_about">Login</div>
                </Link>
            </li>
        </ul>
        </nav>
        </header>
    </div>
    );
}
