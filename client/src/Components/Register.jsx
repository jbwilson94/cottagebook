import React, { useState, useRef, useEffect } from "react";
import AuthService from "../Services/AuthService";

const Register = ({ revertView }) => {
  const [user, setUser] = useState({ username: "", password: "", role: "" });
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setUser({ username: "", password: "", role: "" });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.register(user).then((data) => {
      resetForm();
    });
    revertView();
  };

  return (
    <form onSubmit={onSubmit}>
      <h3>Add User</h3>
      <div className="input-group">
        <label for="new-username"> Username: </label>
        <input
          type="text"
          name="new-username"
          id="new-username"
          value={user.username}
          onChange={onChange}
          placeholder="Enter Username"
          autoComplete="off"
        />
      </div>
      <div className="input-group">
        <label for="new-password"> Password: </label>
        <input
          type="password"
          name="new-password"
          id="new-password"
          value={user.password}
          onChange={onChange}
          placeholder="Enter Password"
        />
      </div>
      <div className="input-group checkmark">
        <label for="role"> Role: </label>
        <input
          type="text"
          name="role"
          value={user.role}
          onChange={onChange}
          placeholder="Enter role (admin/user)"
        />
      </div>
      <button type="submit"> Register </button>
    </form>
  );
};

export default Register;
