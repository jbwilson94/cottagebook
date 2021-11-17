import { useState } from 'react';
import axios from 'axios';
import Calendar from './Calendar';
import NavBar from './NavBar';
import AddEvent from './AddEvent';
import Register from './Register';
import '../Styleshseets/home.css';

const Home = () => {
    const [view, setView] = useState('cal');
    const [events, setEvents] = useState([]);

    async function loadEvents() {
        setEvents((await (await axios.get("/api/calendar/get-events")).data));
    }

    function renderView() {
        if(view === 'cal') {
            loadEvents();
            return   <Calendar 
                        events={events} 
                        setEvents={setEvents}/>
        }

        else if(view === 'addEvent') 
            return <AddEvent 
                        events={events} 
                        setEvents={setEvents} 
                        setView={setView}
                        loadEvents={loadEvents}/>

        else if(view === 'addUser') 
            return <Register/>
    }

    return (
        <div>
            <NavBar setView={setView}/>
            { renderView() }
        </div>
    )
}

export default Home;