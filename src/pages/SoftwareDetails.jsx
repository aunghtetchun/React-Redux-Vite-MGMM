import React from "react";
import { useEffect } from "react";
import { Badge, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {  Link, useParams } from "react-router-dom";
import {FiLayers, FiSettings, FiPackage, FiSave, FiCalendar, FiCpu, FiDownload} from "react-icons/fi";
// import RelatedSoftwares from "../components/RelatedSoftwares";
import ShareInfo from "../components/ShareInfo";
import { fetchSoftwareDetails } from "../actions/softwareAction";
import ImageCarousel from "../components/ImageCarousel";

export default function SoftwareDetails() {
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
  }, [dispatch]);

  
  if (!software) {
    return  <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner>;
  }

  return (
    <>
      {software && (
        <div className="d-flex px-2 flex-wrap justify-content-center align-items-center">
          <div className="d-flex col-12 flex-wrap align-items-start justify-content-center">
            <div
              className="col-3 details_img col-md-2 col-lg-1 px-1  pt-1 "
            >
              <img
                src={software.logo}
                alt=""
                className="w-100 my-2"
              />
            </div>
            <div className="col-12 text-center px-0">
              <h5 className=" mt-1 ps-2 ps-md-0 mb-2  font-weight-bold ">
                {software.name}
              </h5>
            </div>
          </div>
          <div className="col-12 col-md-8 mx-auto px-0 mt-2">
                <table className="table table-bordered mx-0 mb-0 px-0 w-100 table-striped">
                    <tbody>
                        <tr>
                            <td className="nowrap"> <FiCpu className="text-primary"/> &nbsp; Company</td>
                            <td>{software.developer}</td>
                        </tr>
                        <tr>
                            <td className="nowrap"> <FiCalendar className="text-primary"/> &nbsp; Updated</td>
                            <td>{software.updated}</td>
                        </tr>
                        <tr>
                            <td className="nowrap"> <FiSave className="text-primary"/>&nbsp; Size</td>
                            <td>{software.size}</td>
                        </tr>
                        <tr>
                            <td className="nowrap"> <FiLayers className="text-primary"/>&nbsp; Version</td>
                            <td>{software.version}</td>
                        </tr>
                        <tr>
                            <td className="nowrap"> <FiSettings className="text-primary"/>&nbsp; Requierment</td>
                            <td> {software.requirement}</td>
                        </tr>
                        <tr>
                            <td className="nowrap"> <FiPackage className="text-primary"/>&nbsp; Type</td>
                            <td> {software.type}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="col-12 col-lg-5 mt-4 text-center ">
                <ImageCarousel images={software.photos}/>
            </div>
            <div className="col-12 text-center details_title">
                <h4 className="col-12 font-weight-bolder mt-3 pb-0 fw-bolder text-center ">About Software</h4>                
                <div className="px-3" dangerouslySetInnerHTML={{ __html: software.description}}></div>
                <div className="text-center">
                    <Badge
                      pill bg="secondary" className="font-weight-bold  px-3 py-2 my-2 mx-1"
                    >
                      Uploaded by {software.username}
                    </Badge>
                 </div>
                <h4 className="col-12 font-weight-bolder mt-3 pb-0 mb-0 text-center ">Mod Features</h4>                
                <p >{software.features}</p>
                <h4 className="col-12 font-weight-bolder my-3 pb-0 fw-bolder text-center ">ဒီမှာဒေါင်းပါ</h4>                
                 <Link to={`/download-software/${software.slug}`} className="btn bg_main px-4 py-2"><FiDownload/> Download Software</Link>
                 <ShareInfo/>
                {/* <RelatedSoftwares id={software.category_id} />       */}
            </div>
        </div>
      )}
    </>
  );
}
