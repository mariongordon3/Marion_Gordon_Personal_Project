import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { Journal } from "./components/Journal.jsx";
import HomePage from "./components/HomePage.jsx";
import LogIn from "./components/logIn.jsx";
import PlateMaker from "./components/PlateMaker.jsx"
import ErrorPage from "./ErrorPage.jsx";
import RegisterPage from "./components/Register.jsx";
const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <HomePage />
        },
        { 
          path: "journal",
          element: <Journal />
        },
        {
          path:"plateMaker",
          element:<PlateMaker />
        },
        {
            path: "/register",
            element: <RegisterPage />
          },
          {
            path: "/login",
            element: <LogIn />
          }
      ],
    },
    {
      path: "/*",
      element: <ErrorPage />
    },
  ]);
  
  export default router;
  