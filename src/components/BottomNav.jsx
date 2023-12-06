import { Link, useLocation } from "react-router-dom";
import { FiCpu, FiUserCheck, FiGrid, FiSend, FiPhoneCall, FiShoppingBag} from "react-icons/fi";
import { useSelector } from "react-redux";
export default function BottomNav() {
  const location = useLocation();
  const isRequestPage = location.pathname.includes('/posts');
  const changeColor = isRequestPage ? 'text_main bg-light' : 'text-light';
  // const isRequestPage = location.pathname.includes('/request');
  // const changeColor = isRequestPage ? 'text_main bg-light' : 'text-light';

  const isSoftwarePage = location.pathname.includes('/software');
  const changeColorSoftware = isSoftwarePage ? 'text_main bg-light' : 'text-light';

  const isLoginPage = location.pathname.includes('/user/login');
  const isLoginPageRegister = location.pathname.includes('/user/register');
  const isLoginPageProfile = location.pathname.includes('/profile');
  const changeColorLogin = isLoginPage || isLoginPageProfile || isLoginPageRegister? 'text_main bg-light' : 'text-light';

  const selectedHome = window.location.pathname === '/';
  const isCategory = location.pathname.includes('/category');
  const isGames = location.pathname.includes('/games');
  const changeColorHome = selectedHome || isCategory || isGames ? 'text_main bg-light' : 'text-light';

  const current_url = useSelector((state) => state.gameReducer.current_url);

  const isAdultPage = location.pathname.includes('adult');
  const changeColorAdult= selectedHome || isCategory || isAdultPage ? 'text_main bg-light' : 'text-light';


  // console.log(current_url);
  return (
    <>
        {!isAdultPage ?

      <div className="col-12 px-0 mx-0 shadow shadow-lg bg_main border border-red d-flex justify-content-center align-items-center mobile_nav">
        <Link to={current_url} className={`${changeColorHome} col py-2 px-0 text-center `}>
          <FiGrid className={`${changeColorHome}`}/>
          <h6 className={`my-1 ${changeColorHome}`}>Game</h6>
        </Link>
       
       
        <Link to={'/softwares'} className={`${changeColorSoftware} col py-2  px-0 text-center `}>
          <FiCpu className={`${changeColorSoftware}`}/>
          <h6 className="my-1">Software</h6>
        </Link>
        {/* <Link to="/request" className={`col py-2   px-0 text-center ${changeColor}`}>
          <FiSend className={`${changeColor}`}/> 
          <h6 className={`my-1  ${changeColor}`}>Request</h6>
        </Link> */}
        <Link to="/posts" className={`col py-2   px-0 text-center ${changeColor}`}>
          <FiShoppingBag className={`${changeColor}`}/> 
          <h6 className={`my-1  ${changeColor}`}> Shop</h6>
        </Link>
        <Link to="/profile" className={`col py-2   px-0 text-center ${changeColorLogin}`}>
          <FiUserCheck className={`${changeColorLogin}`}/>
          <h6 className={`my-1 ${changeColorLogin}`}>Account</h6>
        </Link>
      </div>
      :
      <div className="col-12 adult-bottom px-0 mx-0 shadow shadow-lg bg_main border border-red d-flex justify-content-center align-items-center mobile_nav">
        <Link to="/adults" className={`${changeColorAdult} col-4 py-2 px-0 text-center `}>
          <FiGrid className={`${changeColorAdult}`}/>
          <h6 className={`my-1 ${changeColorAdult}`}>Adults</h6>
        </Link>
        <div className="col text-center">
            <h6 className="my-2">ကြော်ငြာထည့်သွင်းလိုပါက</h6>
            <h6 className="mt-2"><a className="text-light" href="tel:+95971404793"><FiPhoneCall/> &nbsp;09 971404793 </a></h6>
        </div>
        {/* <Link to="/request" className={`col py-2   px-0 text-center ${changeColor}`}>
          <FiSend className={`${changeColor}`}/> 
          <h6 className={`my-1  ${changeColor}`}>Request</h6>
        </Link>
        <Link to="/profile" className={`col py-2   px-0 text-center ${changeColorLogin}`}>
          <FiUserCheck className={`${changeColorLogin}`}/>
          <h6 className={`my-1 ${changeColorLogin}`}>Account</h6>
        </Link> */}
      </div>
      }
    </>
  );
}
