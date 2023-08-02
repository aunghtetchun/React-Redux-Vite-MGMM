import React from "react";
import { FiFacebook, FiSend } from "react-icons/fi";

export default function ShareInfo() {
  return (
    <div className="col-12 col-md-10 mx-auto px-0 mt-3 text-center d-flex flex-wrap">
      <div className="col-6 pl-0 pe-2">
        <a
          className="btn col-12 text-light py-2 fb_btn"
          href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fmodsoftwaresmm.com%2Fsoftwares%2FNorthgard"
        >
          <FiFacebook /> Share Facebook
        </a>
      </div>
      <div className="col-6 ps-2 pr-0">
        <a
          href="https://t.me/+skU4FVRG3_ZkYzE1"
          className="btn py-2 px-0 col-12  tg_btn"
        >
          <FiSend/> Join Telegram
        </a>
      </div>
    </div>
  );
}
