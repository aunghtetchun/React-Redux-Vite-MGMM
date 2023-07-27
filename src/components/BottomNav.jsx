import { Link, useLocation } from "react-router-dom";
import { FiCpu,FiBox, FiUserCheck, FiPackage} from "react-icons/fi";
export default function BottomNav() {
  const location = useLocation();
  const isRequestPage = location.pathname.includes('/request');
  const changeColor = isRequestPage ? 'text-danger' : '';

  const isLoginPage = location.pathname.includes('/user/login');
  const changeColorLogin = isLoginPage ? 'text-danger' : '';

  const selectedHome = window.location.pathname === '/';
  const changeColorHome = selectedHome ? 'text-danger' : '';

  return (
    <>
      <div className="col-12 d-md-none d-block pb-2 pt-3 shadow shadow-lg border d-flex justify-content-center align-items-center mobile_nav">
        <Link to="/" className="col  px-0 text-center ">
          <FiPackage className={`${changeColorHome}`}/>
          <h6 className={`my-1 ${changeColorHome}`}>Game</h6>
        </Link>
       
        <div className="col  px-0 text-center">
          <FiCpu/>
          <h6 className="my-1">Software</h6>
        </div>
        <Link to="/request" className={`col   px-0 text-center ${changeColor}`}>
          <FiBox/> 
          <h6 className={`my-1  ${changeColor}`}>Request</h6>
        </Link>
        <Link to="/user/login" className={`col   px-0 text-center ${changeColorLogin}`}>
          <FiUserCheck/>
          <h6 className={`my-1 ${changeColorLogin}`}>Account</h6>
        </Link>
      </div>
    </>
  );
}
