import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import { fetchAdultDetails } from "../actions/adultAction";
import AdultBottom from "../components/AdultBottom";

export default function DownloadAdult() {
  const dispatch = useDispatch();
  const { slug } = useParams();

  const adult = useSelector((state) => state.adultReducer.adult);  /// state ယူတဲ့အဆင့်
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // Fetch the adult details when the component mounts  state ထည့်တဲ့အဆင့်
    dispatch(fetchAdultDetails(slug));
  }, [dispatch,slug]);

  
  if (!adult) {
    return <div>Adult not found.</div>;
  }

  return (
    <>
      <div className="card col-12 px-0 shadow mt-3">        
        <div className="card-body d-flex flex-wrap justify-content-center align-items-center">
          <h4 className="col-12 mb-0 fw-bolder">{adult.name}</h4>
            <hr className="col-12 px-0" />
          {adult.link1 && (
            <div className="col-12 col-md-6 col-lg-4 p-2">
              <a
                href={`https://modgamesmm.com/download/${adult.slug}/link1/adult`}
                className="btn bg_main px-3 py-2  w-100"
              >
                {adult.name_1}
              </a>
            </div>
          )}

          {adult.link2 && (
            <div className="col-12 col-md-6 col-lg-4 p-2">
              <a
                href={`https://modgamesmm.com/download/${adult.slug}/link2/adult`}
                className="btn bg_main px-3 py-2  w-100"
              >
                {adult.name_2}
              </a>
            </div>
          )}
          {adult.link3 && (
            <div className="col-12 col-md-6 col-lg-4 p-2">
              <a
                href={`https://modgamesmm.com/download/${adult.slug}/link3/adult`}
                className="btn bg_main px-3 py-2  w-100"
              >
                {adult.name_3}
              </a>
            </div>
          )}
        </div>
        <div className="card-footer text-center">
            <h6 className="fw-bold">{adult.count} ယောက် ဒေါင်းထားပါတယ်</h6>
        </div>
      </div>

    </>
  );
}
