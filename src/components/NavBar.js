import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";


function NavBar(){

    return(
        <div className="topnav">
        <h2>💡 Epiph</h2>
            <div className="topnav-right">
                <Link to="/home">🏠 Home </Link>
                <Link to="/">🔍 Explore Ideas</Link>
                <Link to="/new">🚀 Submit Ideas </Link>
            </div>
        </div>

    );
}

export default NavBar;

