import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import { fetchSoftwareDetails } from "../actions/softwareAction";

export default function DownloadSoftware() {
  const dispatch = useDispatch();
  const { slug } = useParams();

  const software = useSelector((state) => state.softwareReducer.software);  /// state ယူတဲ့အဆင့်
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // Fetch the software details when the component mounts  state ထည့်တဲ့အဆင့်
    dispatch(fetchSoftwareDetails(slug));
  }, [dispatch,slug]);

  
  if (!software) {
    return <div>Software not found.</div>;
  }

  return (
    <>
      <div className="card col-12 px-0 shadow mt-3">        
        <div className="card-body d-flex flex-wrap justify-content-center align-items-center">
          <h4 className="col-12 mb-0 fw-bolder">{software.name}</h4>
            <hr className="col-12 px-0" />
          {software.link1 && (
            <div className="col-12 col-md-6 col-lg-4 p-2">
              <a
                href={software.link1}
                className="btn bg_main px-3 py-2  w-100"
              >
                {software.name_1}
              </a>
            </div>
          )}

          {software.link2 && (
            <div className="col-12 col-md-6 col-lg-4 p-2">
              <a
                href={software.link2}
                className="btn bg_main px-3 py-2  w-100"
              >
                {software.name_2}
              </a>
            </div>
          )}
          {software.link3 && (
            <div className="col-12 col-md-6 col-lg-4 p-2">
              <a
                href={software.link3}
                className="btn bg_main px-3 py-2  w-100"
              >
                {software.name_3}
              </a>
            </div>
          )}
        </div>
        <div className="card-footer text-center">
            <h6 className="fw-bold">{software.count} ယောက် ဒေါင်းထားပါတယ်</h6>
        </div>
      </div>

    </>
  );
}
