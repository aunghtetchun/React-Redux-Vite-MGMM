import React from "react";
import { Outlet } from "react-router-dom";
// import { SwitchTransition, CSSTransition } from "react-transition-group";
import "./style.css";
import "./snowfall.css";
import BottomNav from "../../components/BottomNav";
export default function Layout() {
  // const location = useLocation();

  return (
    <div className="container-fluid mb-5 pb-5">
      <div className="row justify-content-center">
        {/* <SwitchTransition>
          <CSSTransition
             timeout={200} 
             classNames="fade"
            key={location.pathname}
          >  */}
            <div className="col-12 col-lg-10 mt-0 px-0">
              <div className="container">
                <div className="row justify-content-center align-items-center mx-0 mx-md-0">
                  <div className="col-12 col-lg-8 px-0 d-flex flex-wrap justify-content-center align-items center">
                    <Outlet />
                  </div>
                </div>
              </div>
            </div>
          {/* </CSSTransition>
        </SwitchTransition> */}
        <BottomNav/>
        <snowfall>
          <snowflake><span>.</span>️️</snowflake>
          <snowflake><img src="./snow1.png"/>️</snowflake>
          <snowflake><img src="./snow1.png"/>️</snowflake>
          <snowflake><img src="./snow1.png"/>️</snowflake>
          <snowflake><img src="./snow8.png"/>️</snowflake>
          <snowflake><img src="./snow1.png"/>️</snowflake>
          <snowflake><img src="./snow1.png"/>️</snowflake>
          <snowflake><img src="./snow1.png"/>️</snowflake>
          <snowflake><img src="./snow1.png"/>️</snowflake>
          <snowflake><img src="./snow1.png"/>️</snowflake>
          <snowflake><img src="./snow1.png"/>️</snowflake>
          <snowflake><img src="./snow1.png"/>️</snowflake>
          <snowflake><img src="./snow1.png"/>️</snowflake>
          <snowflake><img src="./snow8.png"/>️</snowflake>
          <snowflake><img src="./snow1.png"/>️</snowflake>
          <snowflake><img src="./snow2.png"/>️</snowflake>
          <snowflake><img src="./snow2.png"/>️</snowflake>
          <snowflake><img src="./snow2.png"/>️</snowflake>
          <snowflake><img src="./snow2.png"/>️</snowflake>
          <snowflake><img src="./snow2.png"/>️</snowflake>
          <snowflake><img src="./snow2.png"/>️</snowflake>
          <snowflake><img src="./snow2.png"/>️</snowflake>
          <snowflake><img src="./snow2.png"/>️</snowflake>
          <snowflake><img src="./snow2.png"/>️</snowflake>
          <snowflake><img src="./snow8.png"/>️</snowflake>
          <snowflake><img src="./snow5.png"/>️</snowflake>
          <snowflake><img src="./snow3.png"/>️</snowflake>
          <snowflake><img src="./snow2.png"/>️</snowflake>
          <snowflake><img src="./snow2.png"/>️</snowflake>
          <snowflake><img src="./snow2.png"/>️</snowflake>
          <snowflake><img src="./snow6.png"/>️</snowflake>
          <snowflake><img src="./snow6.png"/>️</snowflake>
          <snowflake><img src="./snow6.png"/>️</snowflake>
          <snowflake><img src="./snow9.png"/>️</snowflake>
          <snowflake><img src="./snow6.png"/>️</snowflake>
          <snowflake><img src="./snow6.png"/>️</snowflake>
          <snowflake><img src="./snow6.png"/>️</snowflake>
          <snowflake><img src="./snow9.png"/>️</snowflake>
          <snowflake><img src="./snow6.png"/>️</snowflake>
          <snowflake><img src="./snow6.png"/>️</snowflake>
          <snowflake><img src="./snow9.png"/>️</snowflake>
          <snowflake><img src="./snow6.png"/>️</snowflake>
          <snowflake><img src="./snow6.png"/>️</snowflake>
          <snowflake><img src="./snow6.png"/>️</snowflake>
          <snowflake><img src="./snow6.png"/>️</snowflake>
          <snowflake><img src="./snow6.png"/>️</snowflake>
          <snowflake><img src="./snow5.png"/>️</snowflake>
      </snowfall>

      </div>
    </div>
  );
}
