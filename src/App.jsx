import { createRoot } from "react-dom/client";
import React, { useState } from "react";
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./Body";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import CountryDetail from "./components/CountryDetail";
import Contact from "./components/Contact";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Body/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/',
          element: <Home/>
      },
      {
        path: '/contact',
          element: <Contact/>
      },
      {
        path: '/:country',
          element: <CountryDetail/> 
      },
    ]
  },
])

const root = createRoot(document.getElementById("root"))
root.render(<RouterProvider router={router} />)
