import Home from "../pages/Home.jsx";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/layouts/Layout.jsx";
import Create from "../pages/Create.jsx";
import Search from "../pages/Search.jsx";
import LoginUser from "../components/auth/LoginUser.jsx";
import RegisterUser from "../components/auth/RegisterUser.jsx";
import Games from "../pages/Games.jsx";
import GameDetails from "../components/GameDetails.jsx";
import Download from "../pages/Download.jsx";
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
        path: "/create",
        element: <Create />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/games/category/:id",
        element: <Games />,
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
    ],
  },
]);
export default router;
