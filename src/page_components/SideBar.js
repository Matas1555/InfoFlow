import "../css/sidebar.css";
import "../assets/font-awesome/css/font-awesome.min.css";

export default function SideBar(){
    return(
        <div className="container">
        <nav className="nav_sidebar">
            <ul className="nav_sidebar_cat">
                <li>
                    
                    <h1 className="nav_sidebar_h1"><i className="fa fa-bars fa-lg " aria-hidden="true"></i><span></span> Categories</h1>
                </li>
                <li>
                    
                    <button><i className="fa fa-bell fa-lg" aria-hidden="true"></i> <span></span> Nav1</button>
                </li>
                <li>
                    
                    <button><i className="fa fa-bell fa-lg" aria-hidden="true"></i> <span></span> Nav2</button>
                </li>
                <li>
                    
                    <button><i className="fa fa-bell fa-lg" aria-hidden="true"></i> <span></span> Nav3</button>
                </li>
                <li>
                    
                    <button><i className="fa fa-bell fa-lg" aria-hidden="true"></i> <span></span> Nav4</button>
                </li>
                <li>
                    
                    <button><i className="fa fa-bell fa-lg" aria-hidden="true"></i> <span></span> Nav5</button>
                </li>
                <li>
                    
                    <button><i className="fa fa-bell fa-lg" aria-hidden="true"></i> <span></span> Nav6</button>
                </li>
                <li>
                    
                    <button><i className="fa fa-bell fa-lg" aria-hidden="true"></i> <span></span> Nav7</button>
                </li>
            </ul>
            <ul className="nav_sidebar_logout">
                <li>
                    <button><i className="fa fa-power-off fa-lg"></i> <span></span> Logout</button>
                </li>
            </ul>
        </nav>
    </div>
    );
}
