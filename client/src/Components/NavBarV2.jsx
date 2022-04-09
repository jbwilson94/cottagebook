import { useState, useEffect, useContext } from "react";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarPlus,
  faXmark,
  faUser,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";

export default function NavBarV2({ setView }) {
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
    
  };

  return (
    <div className="navbar" id="navbar">
      <div className="navbar-head">
        <div className="navbar-brand">Cottage Book</div>
        <button>
          <FontAwesomeIcon icon={faXmark} /> 
        </button>
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
