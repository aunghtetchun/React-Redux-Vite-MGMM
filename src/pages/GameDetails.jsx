import React from "react";
import { useEffect } from "react";
import { Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {  Link, useParams } from "react-router-dom";
import { fetchGameDetails } from "../actions/gameActions";
import {FiLayers, FiSettings, FiPackage, FiSave, FiCalendar, FiCpu} from "react-icons/fi";
import RelatedGames from "../components/RelatedGames";
import ShareInfo from "../components/ShareInfo";

export default function GameDetails() {
  const dispatch = useDispatch();
  const { slug } = useParams();

  const game = useSelector((state) => state.gameReducer.game);  /// state ယူတဲ့အဆင့်
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // Fetch the game details when the component mounts  state ထည့်တဲ့အဆင့်
    dispatch(fetchGameDetails(slug));
  }, [dispatch,slug]);

  
  if (!game) {
    return <div>Game not found.</div>;
  }

  return (
    <>
      {game && (
        <div className="d-flex mt-4 flex-wrap justify-content-center align-items-center">
          <div className="d-flex col-12 flex-wrap align-items-start justify-content-center">
            <div
              className="col-3 details_img col-md-2 col-lg-1 px-1  pt-1 "
            >
              <img
                src={game.logo}
                alt=""
                className="w-100 mb-2"
              />
            </div>
            <div className="col-12 text-center px-0">
              <h5 className=" mt-1 ps-2 ps-md-0 mb-2  font-weight-bold ">
                {game.name}
              </h5>
            </div>
          </div>
          <div className="col-12 px-0 text-center">
            {game.categories &&
              game.categories.map((category) => {
                  <div key={category.id}>
                    <Badge pill bg="warning" className="font-weight-bold my-1 mx-1">
                      {category.title}
                    </Badge>
                  </div>
              })}
          </div>
          <div className="col-12 col-md-7 mx-auto px-0 mt-2">
                <table className="table table-bordered mx-0 mb-0 px-0 w-100 table-striped">
                    <tbody>
                        <tr>
                            <td className="nowrap"> <FiCpu className="text-primary"/> &nbsp; Company</td>
                            <td>{game.developer}</td>
                        </tr>
                        <tr>
                            <td className="nowrap"> <FiCalendar className="text-primary"/> &nbsp; Updated</td>
                            <td>{game.updated}</td>
                        </tr>
                        <tr>
                            <td className="nowrap"> <FiSave className="text-primary"/>&nbsp; Size</td>
                            <td>{game.size}</td>
                        </tr>
                        <tr>
                            <td className="nowrap"> <FiLayers className="text-primary"/>&nbsp; Version</td>
                            <td>{game.version}</td>
                        </tr>
                        <tr>
                            <td className="nowrap"> <FiSettings className="text-primary"/>&nbsp; Requierment</td>
                            <td> {game.requirement}</td>
                        </tr>
                        <tr>
                            <td className="nowrap"> <FiPackage className="text-primary"/>&nbsp; Type</td>
                            <td> {game.type}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="col-12 text-center details_title">
                <h4 className="col-12 font-weight-bolder mt-3 pb-0 fw-bolder text-center ">ဂိမ်းအကြောင်း</h4>                
                <p key="game-description" dangerouslySetInnerHTML={{ __html: game.description }}></p>
                <div className="text-center">
                    <Badge
                      pill bg="danger" className="font-weight-bold  px-3 py-2 my-2 mx-1"
                    >
                      Uploaded by {game.username}
                    </Badge>
                 </div>
                <h4 className="col-12 font-weight-bolder mt-3 pb-0 mb-0 text-center ">Mod Features</h4>                
                <p >{game.features}</p>
                <h4 className="col-12 font-weight-bolder my-3 pb-0 fw-bolder text-center ">ဒီမှာဒေါင်းပါ</h4>                
                 <Link to={`/download/${game.slug}`} className="btn btn-primary px-4 py-2">Download Game</Link>
                 <div className="col-12 col-md-6 col-lg-6 mx-auto px-0 mt-3 text-center d-flex flex-wrap">
                 <ShareInfo/>
                 
                </div>
                <h4 className="col-12 font-weight-bolder my-3 pb-0 fw-bolder text-center ">ဆင်တူသောဂိမ်းများ</h4>   
                <RelatedGames id={game.category_id} />      
            </div>
        </div>
      )}
    </>
  );
}
