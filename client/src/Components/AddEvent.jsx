import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../Context/AuthContext";
import '../Styleshseets/addevent.css';

export default function AddEvent({ setView, loadEvents}) {
    const {user} = useContext(AuthContext);
    const [event, setEvent] = useState({
        title: user.username,
        start: "",
        end: "",
        people: 1
    })

    async function handleEventAdd(data) {
        await axios.post("/api/calendar/create-event", data);
    }

    // Adds a day to make the dates inclusive 
    function addDay(date) {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 2);

        let day = "";
        let month = "";
        let year = newDate.getFullYear();

        // Day: Adding 0 to the front if needed
        if(newDate.getDate()<10) day = '0'+newDate.getDate();
        else day = newDate.getDate();

        // Month: Adding 0 to the front if needed
        if(newDate.getMonth()<10) month = '0'+(newDate.getMonth()+1);
        else month = newDate.getMonth()+1;

        return year+'-'+month+'-'+day;
    }

    const onSubmit = () => {
        handleEventAdd(event);
        loadEvents();
        setView('cal');
    }

    return (
        <div className="container addevent">
            <form onSubmit={onSubmit}>
                <h3>Add Event</h3>
                <div class="form-group">
                    <label>Start Date: </label>
                    <input 
                        type="date" 
                        class="form-control"
                        required={true}
                        onChange={(data) => setEvent({...event, start: data.target.value })} />
                </div>
                <br/>
                <div class="form-group">
                    <label>End Date: </label>
                    <input 
                        type="date" 
                        class="form-control"
                        required={true}
                        onChange={(data) => setEvent({...event, end: addDay(data.target.value) })}/>
                </div>
                <br/>
                <div class="form-group">
                    <label>Number of People: </label>
                    <input 
                        type="number" 
                        class="form-control"
                        required={true}
                        onChange={(data) => setEvent({...event, people: data.target.value })}/>
                </div>
                <br />
                <button type="submit" class="btn btn-primary btn-event">Submit</button>
            </form>
        </div>
    )
}