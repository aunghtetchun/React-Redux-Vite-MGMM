import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function DownloadSoftware() {
  const { slug } = useParams();
  const software = useSelector((state) => state.softwareReducer.software);
  let navigate = useNavigate();
  const back = (slug) => {
    navigate(`/softwares/${slug}`);
  };
  if (!software) {
    return (
      <button
        onClick={() => back(slug)}
        className="btn col-12 col-md-6 mt-5 mx-auto btn-danger py-2"
      >
        Back To Software
      </button>
    );
  }

  return (
    <>
      <div className="card px-0 shadow mt-5">        
        <div className="card-body d-flex flex-wrap justify-content-center align-items-center">
          <h4 className="col-12 mb-0 fw-bolder">{software.name}</h4>
            <hr className="col-12 px-0" />
          {software.link1 && (
            <div className="col-12 col-md-6 col-lg-4 p-2">
              <a
                href={software.link1}
                className="btn btn-primary px-3 py-2  w-100"
              >
                {software.name_1}
              </a>
            </div>
          )}

          {software.link2 && (
            <div className="col-12 col-md-6 col-lg-4 p-2">
              <a
                href={software.link2}
                className="btn btn-primary px-3 py-2  w-100"
              >
                {software.name_2}
              </a>
            </div>
          )}
          {software.link3 && (
            <div className="col-12 col-md-6 col-lg-4 p-2">
              <a
                href={software.link3}
                className="btn btn-primary px-3 py-2  w-100"
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
