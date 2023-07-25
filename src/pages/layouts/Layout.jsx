import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import "./style.css";
export default function Layout() {
  const location = useLocation();

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12 bg-primary">
          <div className="container">
            <div className="row justify-content-center">
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
            <div className="col-12 mt-5">
              <div className="container">
                <div className="row justify-content-center">
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
