import { Link, useLocation } from "react-router-dom";
import { FiCpu,FiBox, FiUserCheck, FiPackage} from "react-icons/fi";
import { useSelector } from "react-redux";
export default function BottomNav() {
  const location = useLocation();
  const isRequestPage = location.pathname.includes('/request');
  const changeColor = isRequestPage ? 'text_main bg-light' : 'text-light';

  const isSoftwarePage = location.pathname.includes('/software');
  const changeColorSoftware = isSoftwarePage ? 'text_main bg-light' : 'text-light';

  const isLoginPage = location.pathname.includes('/user/login');
  const changeColorLogin = isLoginPage ? 'text_main bg-light' : 'text-light';

  const selectedHome = window.location.pathname === '/';
  const isCategory = location.pathname.includes('/category');
  const isGames = location.pathname.includes('/games');
  const changeColorHome = selectedHome || isCategory || isGames ? 'text_main bg-light' : 'text-light';

  const current_url = useSelector((state) => state.gameReducer.current_url);
  console.log(current_url);
  return (
    <>
      <div className="col-12 px-0 mx-0 shadow shadow-lg bg_main border border-red d-flex justify-content-center align-items-center mobile_nav">
        <Link to={current_url} className={`${changeColorHome} col py-2 px-0 text-center `}>
          <FiPackage className={`${changeColorHome}`}/>
          <h6 className={`my-1 ${changeColorHome}`}>Game</h6>
        </Link>
       
        <Link to={'/softwares'} className={`${changeColorSoftware} col py-2  px-0 text-center `}>
          <FiCpu className={`${changeColorSoftware}`}/>
          <h6 className="my-1">Software</h6>
        </Link>
        <Link to="/request" className={`col py-2   px-0 text-center ${changeColor}`}>
          <FiBox className={`${changeColor}`}/> 
          <h6 className={`my-1  ${changeColor}`}>Request</h6>
        </Link>
        <Link to="/user/login" className={`col py-2   px-0 text-center ${changeColorLogin}`}>
          <FiUserCheck className={`${changeColorLogin}`}/>
          <h6 className={`my-1 ${changeColorLogin}`}>Account</h6>
        </Link>
      </div>
    </>
  );
}
