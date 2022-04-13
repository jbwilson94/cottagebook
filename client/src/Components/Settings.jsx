import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import axios from "axios";

export default function Settings({ revertView }) {
  const { user } = useContext(AuthContext);
  const [ newName, setNewName ] = useState(user.username);
  const [ checked, setChecked ] = useState(user.email);

  useEffect(() => {
    if(user.screenName!=="") setNewName(user.screenName);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    user.email = checked;
    user.screenName = newName;
    saveChanges();
    updateEvents();
    revertView();
  }

  async function saveChanges() {
    const username = user.username;
    try {
      await axios.patch("/user/update-settings", {
        username: username,
        screenName: newName,
        email: checked
      })
    } catch (error) {
      console.log(error);
    }
  }

  async function updateEvents() {
    let name = user.screenName;
    if(name==="") name = user.username;
  
    try {
      await axios.patch("/api/calendar/update-events", {
        name: name,
        username: user.username
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={onSubmit}>
        <h3>Settings</h3>
        <div className='input-group'>
            <label for="new-username">Your Booking Name: (Will not change login email!)</label>
            <input
                type="text"
                name="new-username"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
            />
        </div>
        <div className='input-group check'>
            <label for="email-notifications">Email Notifications: </label>
            <input
            name="email-notifications"
            type="checkbox"
            checked={checked}
            onClick={() => setChecked(!checked)}
            />
        </div>
        <button type="submit">Save Settings</button>
    </form>
  )
}
