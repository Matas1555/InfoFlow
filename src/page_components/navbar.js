import "../css/navbar.css";
import InfoFlowIcon from "../assets/LOGO.png";
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";

export default function NavBar() {
    return (
        <div className="nav_bar_wrapper">
        <header>
            <a href="home_page.js"><img className="logo" src={InfoFlowIcon} alt="logo"></img></a>
        <nav>
        <ul className="nav_bar">
            <li>
                <Link to="/About">
                <a className="nav_about">About</a>
                </Link>
            </li>
            <li>
            <Link to="/Contact">
                <a className="nav_about">Contact</a>
                </Link>
            </li>
            <li>
            <Link to="/Login">
                <a className="nav_about">Login</a>
                </Link>
            </li>
        </ul>
        </nav>
        </header>
    </div>
    );
}