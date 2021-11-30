import { useContext, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { AuthContext } from "../Context/AuthContext";
import ChangePass from './ChangePass';

export default function Account({ show, setShow, events }) {
    const { user } = useContext(AuthContext);
    const [showPassChange, setShowPassChange] = useState(false);
    const handleClose = () => { setShow(false) };
 
    const handleChangePass = () => {
        handleClose();
        setShowPassChange(true);
    }

    function showEditButton() {
        return (
            <Modal.Footer>
                <Button variant="secondary" onClick={handleChangePass}>
                    Change Password
                </Button>
            </Modal.Footer>
        )
    }

    function showEventCount() {
        let count = 0;
        for (let i = 0; i < events.length; i++) if (events[i].title === user.username) count++;
        return count;
    }

    function showAccountInfo() {
        return (
            <>
                <h6>Number of Bookings: {show ? showEventCount() : null} </h6>
            </>
        )
    }

    return (
        <div>
            {/*Account info*/}
            <Modal show={show}>
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title> {user.username} </Modal.Title>
                </Modal.Header>

                <Modal.Body> {showAccountInfo()} </Modal.Body>

                {showEditButton()}

            </Modal>
            
            {/*Change Pass Modal*/}
            <ChangePass 
                show={showPassChange} 
                setShow={setShowPassChange} 
                username={user.username} />
        </div>
    );
}
