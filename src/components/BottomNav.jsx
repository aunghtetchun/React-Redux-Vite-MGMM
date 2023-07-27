import { Link } from "react-router-dom";
import { FiCpu,FiBox, FiUserCheck} from "react-icons/fi";
import { GrGamepad } from "react-icons/gr";
export default function BottomNav() {

  return (
    <>
      <div className="col-12 d-md-none d-block pb-2 pt-3 shadow shadow-lg border d-flex justify-content-center align-items-center mobile_nav">
        <Link to="/" className="col text-dark  px-0 text-center ">
          <GrGamepad/>
          <h6 className="my-1 text-primary">Game</h6>
        </Link>
       
        <div className="col text-dark  px-0 text-center">
          <FiCpu/>
          <h6 className="my-1">Software</h6>
        </div>
        <div className="col  text-dark  px-0 text-center">
          <FiBox/>
          <h6 className="my-1">Request</h6>
        </div>
        <Link to="/user/login" className="col  text-dark  px-0 text-center">
          <FiUserCheck/>
          <h6 className="my-1">Account</h6>
        </Link>
      </div>
    </>
  );
}
