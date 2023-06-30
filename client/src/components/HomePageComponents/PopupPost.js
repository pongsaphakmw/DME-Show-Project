import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import './PopupPost.css'
import { json, useNavigate } from 'react-router-dom';
 
function PopupPost() {
    const [show, setShow] = useState(false);
    const [post, setPost] = useState('');
    const [showUpload, setShowUpload] = useState(false);
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleShowUpload = () => setShowUpload(true);
    const handleHideUpload = () => setShowUpload(false);
    const navigate = useNavigate();
    const user = getAuth().currentUser;

    useEffect(() => {
        if (!selectedFile || selectedFile.length === 0) {
          setPreview([]);
          return;
        }
      
        const objectUrls = selectedFile.map(file => URL.createObjectURL(file));
        setPreview(objectUrls);
      
        // Free memory when this component is unmounted
        return () => {
          objectUrls.forEach(objectUrl => URL.revokeObjectURL(objectUrl));
        };
      }, [selectedFile]);
      
    const handlePost = async (e) => {
    e.preventDefault();

    try {
        const formData = new FormData();
        formData.append('post', post);
        formData.append('user.uid', user.uid);
        if (!selectedFile || selectedFile.length === 0) {
            console.log('no file');
          }
        else {
        for (let i = 0; i < selectedFile.length; i++) {
            formData.append('selectedFiles', selectedFile[i]);
          }
        }
        const response = await axios.post('/api/post-upload/:postId', { post, user });
        console.log('postId', response.data.postId);
        formData.append('postId',response.data.postId);
        const imgResponse = await axios.post('/api/img-upload', formData,{
        headers:{
            'Content-Type': 'multipart/form-data'
        }});
        
    
        console.log('form data', formData.getAll('selectedFile'));
    } catch (error) {
        console.error(error);
    }

    handleClose();
}

const removePreview = index => {
    const updatedSelectedFile = [...selectedFile];
    updatedSelectedFile.splice(index, 1);
    setSelectedFile(updatedSelectedFile);
  
    const updatedPreview = [...preview];
    updatedPreview.splice(index, 1);
    setPreview(updatedPreview);
  };
    
const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
        setSelectedFile([]);
        setPreview([]);
        return;
    }
  
    const filesArray = Array.from(e.target.files);
    setSelectedFile(filesArray);
  };

    return (
        <div>
            <h4>Post something</h4>
            <Button variant="primary" onClick={handleShow}>
                Post
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Post something</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={3} placeholder="What's on your mind?" onChange={(e) => setPost(e.target.value)} />
                        </Form.Group>
                        {preview && preview.map((objectUrl, index) => (
                            <div key={objectUrl} className="preview-container">
                                <img src={objectUrl} alt="Preview" className="preview" />
                                <button type="button" onClick={() => removePreview(index)}>Remove</button>
                            </div>
                        ))}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleShowUpload}>
                        Upload
                    </Button>
                    <Modal show={showUpload} onHide={handleHideUpload}>
                        <Modal.Header closeButton>
                            <Modal.Title>Upload a file</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formFileMultiple" className="mb-3">
                                    <Form.Control type="file" multiple onChange={onSelectFile} />
                                    {preview && preview.map((objectUrl, index) => (
                                        <div key={objectUrl} className="preview-container">
                                            <img src={objectUrl} alt="Preview" className="preview" />
                                            <button type="button" onClick={() => removePreview(index)}>Remove</button>
                                        </div>
                                    ))}
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleHideUpload}>
                                Done
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Button variant="primary" onClick={handlePost}>
                        Post
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
    }

export default PopupPost;