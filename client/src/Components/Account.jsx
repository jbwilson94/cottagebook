import { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { AuthContext } from "../Context/AuthContext";

export default function Account({ show, setShow, events }) {
    const {user} = useContext(AuthContext);
    const handleClose = () => { setShow(false) };

    function showEditButton() {
        return (
            <Modal.Footer>
                <Button variant="secondary" onClick={null}>
                   Change Password
                </Button>
            </Modal.Footer>
        )
    }

    function showEventCount() {
        let count = 0;
        for(let i = 0; i<events.length ; i++) if(events[i].title===user.username) count++;
        return count;
    }

    function showAccountInfo() {
        return (
            <>  
                <h6>Number of Bookings: { show? showEventCount() : null } </h6>
            </>
        )
    }

    return (
      <> 
        <Modal show={show}>
            <Modal.Header closeButton onClick={handleClose}>
                <Modal.Title> {user.username} </Modal.Title>
            </Modal.Header>

            <Modal.Body> {showAccountInfo()} </Modal.Body>
        
            {showEditButton()}

        </Modal>
      </>
    );
  }
  