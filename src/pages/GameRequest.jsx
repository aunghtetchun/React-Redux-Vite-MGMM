import React, { useEffect, useState } from 'react';
import { FiLogIn, FiUpload } from 'react-icons/fi';
import {  Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { submitGameRequest } from '../actions/gameActions';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';

export default function GameRequest() {
  const message = useSelector((state) => state.gameReducer.message);
  const {  isLoggedIn } = useContext(AuthContext);

  const initialFormData = {
    app_name: '',
    username: 'Unknown',
    phone: '09123456789',
    description: '',
    playstore_link: '',
  };
  const [formData, setFormData] = useState(initialFormData);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitGameRequest(formData));
    setFormData(initialFormData);
  };
  useEffect(() => {
    // Hide the message after 3 seconds
    if (message) {
      setTimeout(() => {
        dispatch({ type: 'CLEAR_MESSAGE' }); // Dispatch an action to clear the message after 3 seconds
      }, 3000);
    }
  }, [message, dispatch]);

  const touchStartX = useRef(0);
  const navigate=useNavigate();
  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    const touchX = event.touches[0].clientX;
    const deltaX = touchX - touchStartX.current;

    // Determine the threshold for considering it a left slide (you can adjust this value)
    const threshold = 150;

    if (deltaX < -threshold) {
      console.log("Sliding left");
      navigate('/profile')
    } else if (deltaX > threshold) {
      navigate('/softwares')
    }
  };

  return (
    <div
    onTouchStart={handleTouchStart}
    onTouchMove={handleTouchMove}
    className='col-12 px-0 min_height'>
    {message &&
    <div className="alert alert-success">{message}</div>
    }
      <div className="card col-12 mt-3">
          <div className="card-body">
          <h4 className="col-12 mt-2 text-center">Link Repair &amp; Request Game</h4>
      <Col>
        <hr />
        <Form className="text-light pb-3" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label className="fw-bold text-dark mt-3">Game Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="app_name"
              value={formData.app_name}
              onChange={handleChange}
              placeholder=""
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="fw-bold text-dark mt-3">Game Type</Form.Label>
            <Form.Control
              required
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Online ? Offline ? Other ?"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="fw-bold text-dark mt-3">Phone Type</Form.Label>
            <Form.Control
              required
              type="text"
              name="playstore_link"
              value={formData.playstore_link}
              onChange={handleChange}
              placeholder=""
            />
          </Form.Group>
         
        </Form>
        {isLoggedIn ?
          <div className='d-flex justify-content-end'>
            <Button className="px-3 py-2 mt-3" type="submit" variant="primary" block>
              <FiUpload />&nbsp;Request Game
            </Button>
          </div>
          :
          <div className='d-flex flex-wrap justify-content-end'>
            <span className='col-12 alert alert-danger mt-2'>ဂိမ်းတောင်းဖို့ အတွက် အကောင့်ဝင်ထားဖို့လိုအပ်ပါတယ်...</span>
            <Link to={'/user/login'} className="btn  me-2 mt-2 btn-outline-success px-4 py-2">
              <FiLogIn/>&nbsp;Login Account
            </Link>
          <Button className="px-3 py-2 mt-2" disabled type="text" variant="primary" block>
            <FiUpload />&nbsp;Request Game
          </Button>
        </div>
          }
      </Col>
          </div>
      </div>
    </div>
  );
}
