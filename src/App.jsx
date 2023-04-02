import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProjectPage from "./pages/ProjectPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import PledgePage from "./pages/PledgePage";
import UserPage from "./pages/UserPage";
import AboutPage from "./pages/AboutPage";
import ProjectListPage from "./pages/ProjectListPage";


// Components
import Nav from "./components/Nav/Nav";
// import Footer from "./components/Footer/Footer"; to be created

// CSS
import "./App.css";
import { AuthProvider } from "./providers/AuthProvider";

// import React from "react";

const Layout =() => {
  return (
    <>
      <Nav />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/projects", element: <ProjectListPage /> },
      { path: "/project/:id", element: <ProjectPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/pledges", element: <PledgePage /> },
      { path: "/create-project", element: <CreateProjectPage /> },
      { path: "/user/:id", element: <UserPage /> },  
    ],
  },
]);

function App() {
  return <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>;
}
export default App;