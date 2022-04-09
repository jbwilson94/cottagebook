import { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "./Calendar";
import NavBar from "./NavBar";
import NavBarV2 from "./NavBarV2";
import AddEvent from "./AddEvent";
import Register from "./Register";
import Book from "./Book";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [view, setView] = useState("");
  const [events, setEvents] = useState([]);

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
      document.getElementById("main").style.transform = "translateY(-100vh)";
      document.getElementById("container").style.transform = "translateY(-100vh)";
      document.getElementById("close-icon").style.transform = "translateY(0)";
  }

  function revertView() {
    setView("");
    document.getElementById("main").style.transform = "translateY(0)";
    document.getElementById("container").style.transform = "translateY(0)";
  }

  return (
    <div className="cottage-app">
      <div className="main" id="main">
        <NavBarV2 setView={setView} events={events} />
        <Calendar events={events} setEvents={setEvents} />
      </div>
      <div className="window" id="container">
        <button 
            className="close-icon"
            id="close-icon"
            onClick={() => revertView()}>
            <FontAwesomeIcon icon={faXmark} className="icon" />
        </button>
        {view ? renderView() : null}
      </div>
    </div>
  );
};

export default Home;
