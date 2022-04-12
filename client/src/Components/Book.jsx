import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import "../Styleshseets/addevent.css";

export default function Book({ revertView, loadEvents }) {
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState({
    title: user.screenName==="" ? user.username : user.screenName,
    start: "",
    end: "",
    people: 1,
    booker: user.username
  });

  async function handleEventAdd(data) {
    await axios.post("/api/calendar/create-event", data);
    await axios.post("/mail/send-email", {
      message:
        data.title +
        " has booked from " +
        data.start +
        " to " +
        data.end +
        " with " +
        data.people +
        " people.",
    });
  }

  // Adds a day to make the dates inclusive
  function addDay(date, inc) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + inc);

    let day = "";
    let month = "";
    let year = newDate.getFullYear();

    // Day: Adding 0 to the front if needed
    if (newDate.getDate() < 10) day = "0" + newDate.getDate();
    else day = newDate.getDate();

    // Month: Adding 0 to the front if needed
    if (newDate.getMonth() < 10) month = "0" + (newDate.getMonth() + 1);
    else month = newDate.getMonth() + 1;

    return year + "-" + month + "-" + day;
  }

  const onSubmit = () => {
    handleEventAdd(event);
    loadEvents();
    revertView();
  };

  return (
    <form onSubmit={onSubmit}>
      <h3>Book Event</h3>
      <div className="input-group">
        <label for="start">Start Date: </label>
        <input
          name="start"
          type="date"
          // Gets yesterdays date for the min
          min={addDay(new Date(), 0)}
          required={true}
          onChange={(data) => setEvent({ ...event, start: data.target.value })}
        />
      </div>
      <div className="input-group">
        <label>End Date: </label>
        <input
          type="date"
          min={event.start}
          required={true}
          onChange={(data) =>
            setEvent({ ...event, end: addDay(data.target.value, 2) })
          }
        />
      </div>
      <div className="input-group">
        <label>Number of People: </label>
        <input
          type="number"
          required={true}
          onChange={(data) => setEvent({ ...event, people: data.target.value })}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
