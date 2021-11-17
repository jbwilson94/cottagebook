import { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext'; 

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import EventCard from './EventCard';
import '../Styleshseets/cal.css'
import axios from 'axios';

export default function Calendar({ events }) {
    const [showEventCard, setShowEventCard] = useState(false);
    const [targetEvent, setTargetEvent] = useState(false);
    const { user } = useContext(AuthContext);

    function setColors(){
        for(let i = 0; i<events.length; i++) if(events[i].title!==user.username) {
            let tempEvent = events[i];
            let tempArray = events;
            tempEvent = {...tempEvent, backgroundColor: '#343a40'};
            tempArray[i] = tempEvent;
        } 
    }

    async function deleteEvent() {
        await axios.delete("/api/calendar/delete-event", { data: { _id: targetEvent.event._def.extendedProps._id } });
    }

    function onClickEvent(event) {
        setTargetEvent(event);
        setShowEventCard(true);
    }

    return (
        <div className="cal-container">
            {/* Assigns the colors of events */}
            {setColors()}

            {/* Only renders the event card when there is an event target */}
            {showEventCard ? 
                <EventCard 
                    show={showEventCard} 
                    setShow={setShowEventCard} 
                    targetEvent={targetEvent} 
                    setTargetEvent={setTargetEvent} 
                    deleteEvent={deleteEvent}/> 
                : null
            }

            <FullCalendar
                eventClick={event => onClickEvent(event)}
                eventColor={'#006400'}
                eventSources={[events]}
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                height='100%'
                headerToolbar={{
                    start: 'title',
                    end: 'prev,next'
                }}/>
        </div>
    )
}
