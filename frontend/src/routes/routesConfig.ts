import Layout from "../layouts/Layout";
import loginRoute from "../pages/auth/login/route";
import GuestLayout from "../layouts/GuestLayout";
import { redirect, type RouteObject } from "react-router";
import Dashboard from "../pages/Dashboard";
import GameRoute from "../pages/game/route";
import { tokenManager } from "../utils/apiClient";
import { GameSceneRoute } from "../pages/gameScene/route";

const routes: RouteObject[] = [
  {
    path: "/",
    loader() {
      if (!tokenManager.isAuthenticated()) {
        return redirect("/auth/login");
      }
      return null;
    },
    Component: Layout,
    children: [
      GameRoute,
      {
        path: "/",
        Component: Dashboard,
      },
    ],
  },

  GameSceneRoute,
  {
    path: "auth",
    loader() {
      if (tokenManager.isAuthenticated()) {
        return redirect("/");
      }
      return null;
    },
    Component: GuestLayout,
    children: [loginRoute],
  },
];
export default routes;
