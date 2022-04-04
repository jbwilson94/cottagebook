import { Form, Modal, Button } from "react-bootstrap";
import { useState } from "react";
import axios from 'axios';

export default function ChangePass({ show, setShow, username }) {
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [message, setMessage] = useState("");
  const [passMatch, setPassMatch] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleChangePass = (e) => {
    e.preventDefault();
    changePass();
  };

  async function changePass() {
    setShow(false);
    await axios.patch("/user/change-pass", {
      username:username, password:pass1
    });
  }

  function checkPassMatch(value1, value2) {
    if(value1 === "") {
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
        setMessage("passwords do not match");
        return false;
    }
  }

  return (
    <div>
      {/*Change Pass Modal */}
      <Modal show={show}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title> {username} </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            {message}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="password"
                placeholder="New Password"
                value={pass1}
                onChange={(e) => {
                    setPass1(e.target.value);
                    checkPassMatch(e.target.value,pass2);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={pass2}
                onChange={(e) => {
                  setPass2(e.target.value);
                  checkPassMatch(pass1,e.target.value);
                }}
              />
            </Form.Group>

            <Button
              variant="secondary"
              type="submit"
              onClick={handleChangePass}
              disabled={!passMatch}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
