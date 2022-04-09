import { useState, useEffect, useContext } from "react";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarPlus,
  faGear,
  faUser,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";

export default function NavBarV2({ setView, events }) {
  const [toggle, setToggle] = useState(false);
  const { user, setIsAuthenticated, setUser } = useContext(AuthContext);

  useEffect(() => {
    handleToggle();
    console.log(navigator.userAgent);
  }, []);

  const onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

  // Handles the opening and closing of the nav menu
  const handleToggle = () => {
    if (toggle === false) {
      // Moving the navbar mostly off screen
      document.getElementById("navbar").style.marginLeft = "-163px";

      // Gathering all the nav buttons and moving the icon to the right where visable
      const buttons = document.getElementsByClassName("nav-button");
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.flexDirection = "row-reverse";
        buttons[i].style.justifyContent = "end";
      }

      // Changing the toggle button to a hamburger
      document.getElementById("span1").style.transform = "none";
      document.getElementById("span1").style.marginBottom = "4px";
      document.getElementById("span2").style.opacity = "1";
      document.getElementById("span2").style.marginBottom = "4px";
      document.getElementById("span3").style.transform = "none";

      // Keeping track of the state
      setToggle(true);
    } else {
      // Reversing to the previous state
      document.getElementById("navbar").style.marginLeft = "0px";

      const buttons = document.getElementsByClassName("nav-button");
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.flexDirection = "row";
        buttons[i].style.justifyContent = "start";
      }

      document.getElementById("span1").style.transform =
        "rotate(45deg) translate(-1px, 2px)";
      document.getElementById("span1").style.marginBottom = "0px";
      document.getElementById("span2").style.opacity = "0";
      document.getElementById("span2").style.marginBottom = "0px";
      document.getElementById("span3").style.transform =
        "rotate(-45deg) translate(1px, -4px)";
      setToggle(false);
    }
  };

  return (
    <div className="navbar" id="navbar">
      <div className="navbar-head">
        <div className="navbar-brand">Cottage Book</div>
        <div className="menu-toggle" onClick={handleToggle}>
          <span id="span1"></span>
          <span id="span2"></span>
          <span id="span3"></span>
        </div>
      </div>
      <nav className="navbar-menu">
        <button 
          className="nav-button"
          onClick={() => setView('book')}>
          <FontAwesomeIcon icon={faCalendarPlus} className="icon" />
          Book
        </button>
        
        {/* <button className="nav-button">
          <FontAwesomeIcon icon={faGear} className="icon" />
          Settings
        </button>
        <button className="nav-button">
          <FontAwesomeIcon icon={faUser} className="icon" />
          Account
        </button> */}
        <button className="nav-button" onClick={onClickLogoutHandler}>
          <FontAwesomeIcon icon={faDoorOpen} className="icon" />
          Logout
        </button>
      </nav>
    </div>
  );
}
