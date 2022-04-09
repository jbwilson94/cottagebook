import { useContext } from "react";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarPlus,
  faXmark,
  faDoorOpen,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

export default function NavBarV2({ setView, hideNav }) {
  const { setIsAuthenticated, setUser } = useContext(AuthContext);

  const onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

  return (
    <div className="navbar" id="navbar">
      <div className="navbar-head">
        <div className="navbar-brand">Cottage Book</div>
        <button
          onClick={() => hideNav()}>
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
        
        <button className="nav-button">
          <FontAwesomeIcon icon={faGear} className="icon" />
          Settings
        </button>
        {/*}
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
