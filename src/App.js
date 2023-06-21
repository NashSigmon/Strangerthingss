import "./CSSFiles/App.css";
import "./CSSFiles/Logout.css"
import "./CSSFiles/Home.css"
import "./CSSFiles/Post.css"
import icon from "./Images/ModernIcon.png"
import React, { useState } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom"

import Home from "./components/Home";
import Logout from "./components/Logout";
import Post  from "./components/Post";



const Profile = () => {

}



const Nav = () => {
  return (
    <div id="navbar">
      <Link className="navLink" to="/home">Profile</Link>
      <Link className="navLink" to="/post">Posts</Link>
     
      <Link className="navLink" to="/logout">Log Out</Link>
    </div>
  )
}

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <img id="headerImage" src={icon} alt="Icon"></img>
          <div id="headerContents">
            <Nav />
          </div>
        </header>
        <Route exact path="/home"><Home /></Route>
        <Route exact path="/post"><Post /></Route>
     
        <Route exact path="/logout"><Logout /></Route>
      </BrowserRouter>
    </div>
  )
}

export default App;
