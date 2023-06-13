import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import './PopupPost.css'
 
function PopupPost() {
    const [show, setShow] = useState(false);
    const [post, setPost] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const user = getAuth().currentUser;

    const handlePost = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/post-upload/:postId', { post, user });
        } catch (error) {
            console.error(error);
        }

        handleClose();
    }

    return (
        <div>
            <h4>Post something</h4>
            <Button variant="primary" onClick={handleShow}>
                Post
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{user.displayName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={3} placeholder="What's on your mind?" onChange={(e) => setPost(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handlePost}>
                        Post
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
    }

export default PopupPost;