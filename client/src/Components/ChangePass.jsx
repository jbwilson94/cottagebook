import { Form, Modal, Button } from 'react-bootstrap';
import { useState } from 'react';

export default function ChangePass({ show, setShow, username }) {
    const [ pass1, setPass1 ] = useState('');
    const [ pass2, setPass2 ] = useState('');
    const [ message, setMessage ] = useState('');

    const handleClose = () => { setShow(false) };

    const handleChangePass = () => {
        
    };

    function checkPassMatch() {
        if(pass1 === pass2 ) {

        } else {

        }
    }

    return (
        <div>
            {/*Change Pass Modal */}
            <Modal show={show}>
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title> { username } </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="password" placeholder="New Password" value={pass1} onChange={e => setPass1(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Confirm Password" value={pass2} onChange={e => {
                                setPass2(e.target.value)
                                if (checkPassMatch) {

                                } else {
                                    
                                }

                            }} />
                        </Form.Group>

                        <Button variant="secondary" type="submit" onClick={handleChangePass}>
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
};