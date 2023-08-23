import React from 'react'
import { RouterProvider } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import router from './Router.jsx';
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
