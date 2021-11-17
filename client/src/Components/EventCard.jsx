import { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { AuthContext } from "../Context/AuthContext";

export default function EventCard({show, setShow, targetEvent, deleteEvent}) {
    const {user} = useContext(AuthContext);
    const handleClose = () => { setShow(false) };

    // Assighning the targetEvent variables 
    let targetName = targetEvent.event._def.title;
    let targetStart = addOneDay(targetEvent.event._instance.range.start);
    let targetEnd = targetEvent.event._instance.range.end.toDateString();
    let targetPeople = targetEvent.event._def.extendedProps.people;

    // Adding a day to the start date to show correctly
    function addOneDay(date) {
        let tempDate = new Date(date);
        tempDate.setDate(tempDate.getDate()+1);
        return tempDate.toDateString();
    }

    function showDeleteButton() {
        return (
            <Modal.Footer>
                <Button variant="secondary" onClick={delEvent}>
                    Delete
                </Button>
            </Modal.Footer>
        )
    }

    function delEvent(){
        deleteEvent();
        handleClose();
    }

    function showEventInfo() {
        return (
            <>  
                <h5>Booked By: {targetName} </h5>
                <h6>From: {targetStart} </h6>
                <h6>To: {targetEnd} </h6>
                <h6>Number of People: {targetPeople} </h6>
            </>
        )
    }

    return (
      <> 
        <Modal show={show}>
            <Modal.Header closeButton onClick={handleClose}>
                <Modal.Title> Event Info </Modal.Title>
            </Modal.Header>

            <Modal.Body> {showEventInfo()} </Modal.Body>
        
            {/* Delete Button: shows for the users events */}
            {targetName === user.username ? 
                showDeleteButton() : null
            }

        </Modal>
      </>
    );
  }
  