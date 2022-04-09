import { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "./Calendar";
import NavBarV2 from "./NavBarV2";
import Book from "./Book";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBars } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [view, setView] = useState("");
  const [events, setEvents] = useState([]);
  const [isNavOpen, setIsNavOpen] = useState(false);

  async function loadEvents() {
    setEvents(await (await axios.get("/api/calendar/get-events")).data);
  }

  useEffect(() => {
    loadEvents();
    const interval = setInterval(() => {
      loadEvents();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function renderView() {
    changeView();
    if (view === "book") {
      return <Book loadEvents={loadEvents} revertView={revertView} />;
    }

    /*
        else if(view === 'addEvent') 
            return <AddEvent 
                        events={events} 
                        setEvents={setEvents} 
                        setView={setView}
                        loadEvents={loadEvents}/>

        else if(view === 'addUser') 
            return <Register/>
        */
  }

  function changeView() {
    if(isNavOpen) hideNav();
    document.getElementById("main").style.transform = "translateY(-100vh)";
    document.getElementById("container").style.transform = "translateY(-100vh)";
    document.getElementById("close-icon").style.transform = "translateY(0)";
  }

  function revertView() {
    setView("");
    document.getElementById("main").style.transform = "translateY(0)";
    document.getElementById("container").style.transform = "translateY(0)";
  }

  function showNav() {
    setIsNavOpen(true);
    document.getElementById("main").style.transform = "translateX(300px)";
    document.getElementById("navbar").style.left = "0";
    document.getElementById("screen").style.display = "block";
    document.getElementById("navbar").style.boxShadow = "1px 1px 5px black";
  }

  function hideNav() {
    setIsNavOpen(false);
    document.getElementById("main").style.transform = "translateX(0)";
    document.getElementById("navbar").style.left = "-300px";
    document.getElementById("screen").style.display = "none";
    document.getElementById("navbar").style.boxShadow = "none";

  }

  return (
    <div className="cottage-app">
      <div id="screen" onClick={() => hideNav()}></div>

      <div className="main" id="main">
        <button className="toggle" onClick={() => showNav()}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <Calendar events={events} setEvents={setEvents} />
      </div>

      <NavBarV2 
        setView={setView}
        hideNav={hideNav}/>

      <div className="window" id="container">
        <button
          className="close-icon"
          id="close-icon"
          onClick={() => revertView()}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        {view ? renderView() : null}
      </div>
    </div>
  );
};

export default Home;
