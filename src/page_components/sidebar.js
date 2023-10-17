import "../css/sidebar.css"
import "../assets/font-awesome/css/font-awesome.min.css"

export default function SideBar(){
    return(
        <div class="container">
        <nav class="nav_sidebar">
            <ul class="nav_sidebar_cat">
                <li>
                    
                    <h1 class="nav_sidebar_h1"><i class="fa fa-bars fa-lg " aria-hidden="true"></i><span></span> Categories</h1>
                </li>
                <li>
                    
                    <button><i class="fa fa-bell fa-lg" aria-hidden="true"></i> <span></span> Nav1</button>
                </li>
                <li>
                    
                    <button><i class="fa fa-bell fa-lg" aria-hidden="true"></i> <span></span> Nav2</button>
                </li>
                <li>
                    
                    <button><i class="fa fa-bell fa-lg" aria-hidden="true"></i> <span></span> Nav3</button>
                </li>
                <li>
                    
                    <button><i class="fa fa-bell fa-lg" aria-hidden="true"></i> <span></span> Nav4</button>
                </li>
                <li>
                    
                    <button><i class="fa fa-bell fa-lg" aria-hidden="true"></i> <span></span> Nav5</button>
                </li>
                <li>
                    
                    <button><i class="fa fa-bell fa-lg" aria-hidden="true"></i> <span></span> Nav6</button>
                </li>
                <li>
                    
                    <button><i class="fa fa-bell fa-lg" aria-hidden="true"></i> <span></span> Nav7</button>
                </li>
            </ul>
            <ul class="nav_sidebar_logout">
                <li>
                    <button><i class="fa fa-power-off fa-lg"></i> <span></span> Logout</button>
                </li>
            </ul>
        </nav>
    </div>
    );
}