import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProjectPage from "./pages/ProjectPage";

// Components
import Nav from "./components/Nav/Nav";
// import Footer from "./components/Footer/Footer";

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
      <Footer />
    </>
  );
}
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/project/:id", element: <ProjectPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;

// const HeaderLayout = () => (
//   <div>
//     { <Nav /> }
//     <Outlet />
//   </div>
// );

// const router = createBrowserRouter([
//   {
//     element: <HeaderLayout />,
//     children: [
//       { path: "/", element: <HomePage /> },
//       { path: "/login", element: <LoginPage /> },
//       { path: "/project/:id", element: <ProjectPage /> },
//     ],
//   },
// ]);

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;