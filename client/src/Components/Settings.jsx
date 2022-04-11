import React from 'react'

export default function Settings() {
  return (
    <form>
        <h3>Settings</h3>
        <div className='input-group'>
            <label for="new-username">Username: </label>
            <input
                type="text"
                name="new-username"
                placeholder="Username"
            />
        </div>
        <div className='input-group check'>
            <label for="email-notifications">Email Notifications: </label>
            <input
            name="email-notifications"
            type="checkbox"/>
        </div>
        <button type="submit">Save Settings</button>
    </form>
  )
}
