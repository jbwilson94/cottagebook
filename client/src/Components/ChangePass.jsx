import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

export default function ChangePass({ revertView }) {
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [message, setMessage] = useState("");
  const [passMatch, setPassMatch] = useState(false);
  const { user } = useContext(AuthContext);

  const handleChangePass = (e) => {
    e.preventDefault();
    changePass();
    revertView();
  };

  async function changePass() {
    const username = user.username;
    try {
      await axios.patch("/user/change-pass", {
        username: username,
        password: pass1,
      });
    } catch (error) {
      console.log(error);
    }
  }

  function checkPassMatch(value1, value2) {
    if (value1 === "") {
      setMessage("");
      setPassMatch(false);
      return false;
    }
    if (value1 === value2) {
      setPassMatch(true);
      setMessage("");
      return true;
    } else {
      setPassMatch(false);
      setMessage("Passwords do not match");
      return false;
    }
  }

  return (
    <form autoComplete="off">
      <h3>Change Password</h3>
      <p className="error">{message}</p>
      <div className="input-group">
        <input
          name="new-password"
          id="new-password"
          type="password"
          placeholder="New Password"
          autoComplete="new-password"
          value={pass1}
          onChange={(e) => {
            setPass1(e.target.value);
            checkPassMatch(e.target.value, pass2);
          }}
        />
      </div>
      <div className="input-group">
        <input
          name="confirm-pass"
          id="confirm-password"
          type="password"
          placeholder="Confirm Password"
          autoComplete="confirm-password"
          value={pass2}
          onChange={(e) => {
            setPass2(e.target.value);
            checkPassMatch(pass1, e.target.value);
          }}
        />
      </div>
      <button onClick={handleChangePass} disabled={!passMatch}>
        Submit
      </button>
    </form>
  );
}
