/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// import Dashboard from "./views/Admin/Dashboard";
import UserProfile from "./views/Admin/UserProfile.js";
import TableList from "./views/Admin/Leaderboard.js";
import AllUsers from "./views/Admin/AllUsers";
// import Icons from "./views/Icons";
import Announcements from "./views/Admin/Announcements";
import Topics from "./views/Admin/Topics.js";
import SignUP from "./views/Admin/SignUp.js";
import Logout from "./views/Admin/Logout";

import Login from "./views/Authentication/Login.js";
import ForgotPass from "./views/Authentication/ForgotPassword";
import ResetPassword from "./views/Authentication/ResetPassword";

export const adminRoutes = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: "pe-7s-graph",
  //   component: Dashboard,
  //   layout: "/admin",
  // },
  {
    path: "/topics",
    name: "Topics",
    icon: "pe-7s-graph",
    component: Topics,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "My Profile",
    icon: "pe-7s-user",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/user/:id",
    component: UserProfile,
    layout: "/admin",
  },

  {
    path: "/leaderboard",
    name: "Leaderboard",
    icon: "pe-7s-note2",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/allUsers",
    name: "All Users",
    icon: "pe-7s-users",
    component: AllUsers,
    layout: "/admin",
  },

  {
    path: "/announcements",
    name: "Announcements",
    icon: "pe-7s-bell",
    component: Announcements,
    layout: "/admin",
  },

  {
    path: "/signup",
    name: "Add New Users",
    icon: "pe-7s-id",
    component: SignUP,
    layout: "/admin",
  },

  {
    path: "/logout",
    name: "Logout",
    icon: "pe-7s-back",
    component: Logout,
    layout: "/admin",
  },
];

export const authRoutes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/forgot",
    name: "Forgot",
    component: ForgotPass,
    layout: "/auth",
  },
  {
    path: "/reset",
    name: "Reset",
    component: ResetPassword,
    layout: "/auth",
  },
];
