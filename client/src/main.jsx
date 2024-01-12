import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './components/Homepage/Home.jsx';


// ROUTER FOR PATH OF COMPONENTS
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} >
      <Route path="/" element={<Home/>} />
        </Route>
    </>
  ))
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode >
    <RouterProvider router={router} />
    {/* TOAST POPUP FOR NOTIFY SUCCESS ERROR MESSAGE */}
    <ToastContainer
      position="top-right"
      autoClose={2000}
      limit={9}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      theme="colored"
    />
  </React.StrictMode>,
)
