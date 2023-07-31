import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/layouts/Layout.jsx";
import LoginUser from "../pages/auth/LoginUser.jsx";
import RegisterUser from "../pages/auth/RegisterUser.jsx";
import GameDetails from "../pages/GameDetails.jsx";
import Download from "../pages/Download.jsx";
import GameRequest from "../pages/GameRequest.jsx";
import Softwares from "../pages/Softwares.jsx";
import SoftwareDetails from "../pages/SoftwareDetails.jsx";
import DownloadSoftware from "../pages/DownloadSoftware.jsx";
import PopularGames from "../pages/PopularGames.jsx";
import Games from "../pages/Games.jsx";
import { Category } from "../pages/Category.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <PopularGames />,
      },
      {
        path: "/games",
        element: <Games />,
      },
      {
        path: "/games/category/:category_id",
        element: <Games />,
      },
      {
        path: "/games/search/:keywords",
        element: <Games />,
      },
      {
        path: "/category",
        element: <Category />,
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
      {
        path: "/download-software/:slug",
        element: <DownloadSoftware />,
      },
    ],
  },
]);
export default router;
