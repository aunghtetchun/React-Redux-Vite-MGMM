import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import "./style.css";
import BottomNav from "../../components/BottomNav";
export default function Layout() {
  const location = useLocation();

  return (
    <div className="container-fluid mb-5 pb-5">
      <div className="row justify-content-center">
      <BottomNav/>
        <div className="col-12 bg-primary sticky_nav">
          <div className="container">
            <div className="row justify-content-center ">
              <Navbar />
            </div>
          </div>
        </div>
        <SwitchTransition>
          <CSSTransition
            timeout={200}
            classNames="fade"
            key={location.pathname}
          >
            <div className="col-12 col-lg-10 mt-4 mt-md-5 px-0">
              <div className="container">
                <div className="row justify-content-center align-items-center mx-0 mx-md-0 mx-lg-5">
                  <Outlet />
                </div>
              </div>
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
}
