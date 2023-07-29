import Home from "../pages/Home.jsx";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/layouts/Layout.jsx";
import LoginUser from "../pages/auth/LoginUser.jsx";
import RegisterUser from "../pages/auth/RegisterUser.jsx";
import GameDetails from "../pages/GameDetails.jsx";
import Download from "../pages/Download.jsx";
import GameRequest from "../pages/GameRequest.jsx";
import Softwares from "../pages/Softwares.jsx";
import SoftwareDetails from "../pages/SoftwareDetails.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/games/:slug",
        element: <GameDetails />,
      },
      {
        path: "/user/login",
        element: <LoginUser />,
      },
      {
        path: "/user/register",
        element: <RegisterUser />,
      },
      {
        path: "/download/:slug",
        element: <Download />,
      },
      {
        path: "/request",
        element: <GameRequest />,
      },
      {
        path: "/softwares",
        element: <Softwares />,
      },
      {
        path: "/softwares/:slug",
        element: <SoftwareDetails />,
      },
    ],
  },
]);
export default router;
