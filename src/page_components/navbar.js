import "../css/navbar.css";
import InfoFlowIcon from "../assets/LOGO.png";

export default function NavBar() {
    return (
        <div class="nav_bar_wrapper">
        <header>
            <a href="home_page.js"><img class="logo" src={InfoFlowIcon} alt="logo"></img></a>
        <nav>
        <ul class="nav_bar">
            <li>
                <a class="nav_about" href="about.html">About</a>
            </li>
            <li>
                <a class="nav_contact" href="contact.html">Contact</a>
            </li>
            <li>
                <a class="nav_login" href="login.html">LogIn</a>
            </li>
        </ul>
        </nav>
        </header>
    </div>
    );
}