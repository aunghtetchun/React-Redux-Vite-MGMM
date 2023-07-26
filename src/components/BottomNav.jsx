import {  useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCategories } from "../actions/categoryActions";
import { useDispatch, useSelector } from "react-redux";
import { FiCpu,FiBox, FiHome, FiLayers, FiUser} from "react-icons/fi";
import { ListModal } from "./ListModal";
import { React, useState } from "react";
export default function BottomNav() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoryReducer.categories);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // Fetch the categories when the component mounts
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <div className="col-12 d-md-none d-block pb-2 pt-3 shadow shadow-lg d-flex justify-content-center align-items-center mobile_nav">
        <Link to="/" className="col text-dark  px-0 text-center">
          <FiHome/>
          <h6 className="my-2">Home</h6>
        </Link>
        <div
          data-toggle="modal"
          data-target="#catmodal"
          className="col  text-dark  px-0 text-center"
        >
          <FiLayers/>
          <h6 className="my-2" onClick={handleShow}>Games</h6>
          <ListModal
            handleClose={handleClose}
            show={show}
            categories={categories}
          />
        </div>
        <div className="col text-dark  px-0 text-center">
          <FiCpu/>
          <h6 className="my-2">Software</h6>
        </div>
        <div className="col  text-dark  px-0 text-center">
          <FiBox/>
          <h6 className="my-2">Request</h6>
        </div>
        <Link to="/user/login" className="col  text-dark  px-0 text-center">
          <FiUser/>
          <h6 className="my-2">Profile</h6>
        </Link>
      </div>
    </>
  );
}
