import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FiSend } from 'react-icons/fi';
import { AuthContext } from '../contexts/AuthContext';
import { saveComment } from '../services/api';

export default function CommentBox({ post_id,setComments }) {
  const [comment, setComment] = useState('');
  const [loading,setLoading] = useState(false);
  const { user } = useContext(AuthContext);


  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    if(comment){
      setLoading(true);
      const response = await saveComment(post_id, comment,user.oldToken);
      if (response.success){
        // setComments(response.comment);
        setComments((prevState) => [...prevState, response.comment]);
        setComment('');
        // console.log(response.comment);
      }
    }
  };

  return (
    <>
      <div className="col-12 px-0">
        <Form onSubmit={handleSubmit}>
          <Form.Group className=" mb-2" controlId="exampleForm.ControlTextarea1">
            <Form.Label className="h3 fw-bold mt-2">Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={handleCommentChange}
            />
          </Form.Group>
          <Button variant="secondary" className="w-100" type="submit">
            <FiSend /> Comment
          </Button>
        </Form>
      </div>
    </>
  );
}
