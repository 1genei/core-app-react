import React from "react";

import async from "./components/Async";

// All pages that rely on 3rd party components (other than MUI) are
// loaded asynchronously, to keep the initial JS bundle to a minimum size

// Layouts
import AuthLayout from "./layouts/Auth";
import DashboardLayout from "./layouts/Dashboard";
// Guards
import AuthGuard from "./components/guards/AuthGuard";

// Auth components
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ResetPassword from "./pages/auth/ResetPassword";
import Page404 from "./pages/auth/Page404";
import Page500 from "./pages/auth/Page500";


import Utilisateurs from "./pages/utilisateurs/Index";


// Components
import CreateContact from "./pages/contacts/CreateContact"

// Page components
import Blank from "./pages/pages/Blank";



// Protected routes
import ProtectedPage from "./pages/protected/ProtectedPage";
import Contacts from "./pages/contacts/Index";
import EditContact from "./pages/contacts/EditContact";
import CreateUtilisateur from "./pages/utilisateurs/CreateUtilisateur";
import EditUtilisateur from "./pages/utilisateurs/EditUtilisateur";

// Dashboard components
const Analytics = async(() => import("./pages/dashboards/Analytics"));



// Table components
const DataGrid = async(() => import("./pages/tables/DataGrid"));



const routes = [
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Analytics />,
      },
      {
        path: "blank",
        element: <Blank />,
      },
      {
        path: "liste",
        element: <DataGrid />,
      },
      {
        path: "utilisateurs",
        element: <Utilisateurs />,
      },
      {
        path: "utilisateur/ajouter",
        element: <CreateUtilisateur />,
      },
      {
        path: "utilisateur/modifier/:id",
        element: <EditUtilisateur />,
      },
      {
        path: "contacts",
        element: <Contacts />,
      },
      {
        path: "contact/ajouter",
        element: <CreateContact />,
      },
      {
        path: "contact/modifier/:id",
        element: <EditContact />,
      },
    ],
  },
  
  
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <SignIn />,
      },
      {
        path: "register",
        element: <SignUp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "404",
        element: <Page404 />,
      },
      {
        path: "500",
        element: <Page500 />,
      },
    ],
  },
 

  
 
  
  {
    path: "private",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <ProtectedPage />,
      },
    ],
  },
  {
    path: "*",
    element: <AuthLayout />,
    children: [
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
];

export default routes;
