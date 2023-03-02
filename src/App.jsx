import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProjectPage from "./pages/ProjectPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import PledgePage from "./pages/PledgePage";
import UserPage from "./pages/UserPage";
import ProjectForm from "./components/ProjectForm/ProjectForm";


// Components
import Nav from "./components/Nav/Nav";
// import Footer from "./components/Footer/Footer"; to be created

// CSS
import "./App.css";
import { useState} from "react";
// import React from "react";

const Layout =() => {
const [loggedIn, setLoggedIn] = useState(window.localStorage.getItem("token") != null)
  return (
    <>
      <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Outlet context={[loggedIn, setLoggedIn]} />
      {/* <Footer /> */}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/project/:id", element: <ProjectPage /> },
      // { path: "/about", element: <AboutPage /> },
      // { path: "/contact", element: <ContactPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/pledges", element: <PledgePage /> },
      // { path: "/register", element: <RegistrationPage /> },
      { path: "/create-project", element: <CreateProjectPage /> },
      { path: "/user/:id", element: <UserPage /> },  
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;