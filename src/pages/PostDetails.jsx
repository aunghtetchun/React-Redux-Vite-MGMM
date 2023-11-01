import React from "react";
import { useEffect } from "react";
import { Badge, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {  Link, useParams } from "react-router-dom";
import { FiMessageCircle, FiPhoneCall, FiSend} from "react-icons/fi";
import { fetchPostDetails } from "../actions/postAction";

export default function PostDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const post = useSelector((state) => state.postReducer.post);  /// state ယူတဲ့အဆင့်
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // Fetch the post details when the component mounts  state ထည့်တဲ့အဆင့်
    dispatch(fetchPostDetails(id));
  }, [dispatch]);

  
  if (!post) {
    return  <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner>;
  }
 // Title / Type / Description / Profile /  Security / Price / Skins / Sold
  return (
    <>
      {post && (
        <div className="d-flex px-2 w-100 flex-wrap justify-content-center align-items-center">
           <div className="col-12 mt-4 mb-1 shadow  card text-center px-0">
              <div className="card-header bg_main text-light">
              <h5 className="lh mb-0 fw-bolder ">
                {post.title}
              </h5>
              </div>
              <div className="card-body">
                <p className="mb-0">{post.description}</p>
               
              </div>
            </div>
            <div
              className="col-12  "
            >
              <img
                src={post.profile}
                alt=""
                className="w-100 my-2 rounded-3"
              />
            </div>
            <div className="col-12 border-primary mb-2 shadow card  px-0">
              <div className="card-header bg_main text-light text-center">
              <h5 className="lh mb-0 fw-bolder ">
                အရေးကြီးအချက်အလက်
              </h5>
              </div>
              <div className="card-body p-1">
              <table className="table table-bordered border-success mb-0">
                <tbody>
                <tr>
                    <td  className="fw-bold">Game Info</td>
                    <td >{post.game_id} <span className="text-dark">( {post.server_id} )</span></td>
                  </tr>
                  <tr>
                    <td className="fw-bold">စျေးနှုန်း</td>
                    <td> <span className="fw-bolder h5">
                    {post.price} ကျပ်
                      </span>
                      </td>
                  </tr>
                  <tr>
                    <td className="fw-bold">အခြေအနေ</td>
                    <td>{post.sold == 1 ?  'ရောင်းထွက်သွားပါပြီ' : 'ဝယ်ယူလို့ရပါသေးတယ်'}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">ရောင်းချသူ၏အဆင့်</td>
                    <td> <span className="px-5 py-2 bg-success rounded-3 text-light">
                    {post.security} 
                      </span> </td>
                  </tr>
                </tbody>
              </table>               
              </div>
            </div>
           
            <div className="col-12 card shadow mt-2">
              <div className="card-header bg_main text-light text-center">
                <h5 className="mb-0 fw-bolder">ဓာတ်ပုံများ</h5>
              </div>
              <div className="card-body p-2">
                {post.photos.map((skin) => ( 
                  <img src={skin}  className="w-100 mb-1"/>
                ))}
                {post.skins.map((skin) => ( 
                  <img src={skin}  className="w-100 mb-1"/>
                ))}
              </div>
            </div>
            <div className="col-12 card border_main mt-2 shadow mb-5">
              <div className="card-header bg_main text-light text-center">
                  <h5 className="mb-0 fw-bolder">
                  How to buy?
                  </h5>
              </div>
              <div className="card-body">              
                 <Link to="https://m.facebook.com/profile.php?id=100059336683324" className="btn btn-primary text-light w-100 py-2"><FiMessageCircle/> စာပို့မည်</Link>
                 <Link to="tel:+959971404793" className="btn btn-dark mt-2 text-light w-100 py-2"><FiPhoneCall/> ဖုန်းဆက်မည်</Link>
              </div>
            </div>
            
           
        </div>
      )}
    </>
  );
}
