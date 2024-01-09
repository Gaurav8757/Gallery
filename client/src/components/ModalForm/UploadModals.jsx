import { useState } from "react";
import { RiVideoUploadLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import Form from "./Form";
export function UploadModals() {
  const [isModalOpen, setModalOpen] = useState(false);
  
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };



  return (
    <div className="flex items-center">
      {/* ADD OR UPLOAD VIDEO TO OPEN MODAL */}
      <button
        onClick={toggleModal}
        className="flex items-center mr-4 mt-2  text-white bg-gradient-to-r from-green-400 via-green-600 to-green-600 hover:text-black text-xl  hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg  px-5 py-2 text-center  mb-2"
        type="button"
        data-modal-target="static-modal"
        data-modal-toggle="static-modal"
      >
        <RiVideoUploadLine size={25} className="mx-2 items-center" />
        Add File
      </button>

      {/* GITHUB PROFILE LINK  */}
      <Link to="https://github.com/Gaurav8757" target="_blank">
        <FaGithub size={30} color="white" data-tooltip-target="tooltip-bottom" data-tooltip-placement="bottom" /></Link>
      <div id="tooltip-bottom" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-green-700 bg-gray-200 rounded-lg shadow-sm opacity-0 tooltip ">
        Github Profile Link to see Project
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>


      {/* MAIN MODAL */}
      {isModalOpen && (
        <div
          id="static-modal"
          data-modal-backdrop="static"
          tabIndex="-1"
          className="fixed top-0 right-0  left-0  z-50 flex justify-center items-center w-full h-full bg-gray-700 bg-opacity-50 backdrop-blur-sm"
          onClick={toggleModal}
        >
          <div
            className="relative p-4 w-full max-w-2xl bg-white rounded-lg shadow dark:bg-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL CONTENT */}
            <div className="relative ">
              {/* MODAL HEADER */}
              <div className="flex items-center justify-between p-3 md:p-1 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Upload a Video with Custom Subtitles
                </h3>
                <button
                  type="button"
                  onClick={toggleModal}
                  data-modal-hide="static-modal"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <RxCross2 size={30} />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
             
              {/* MODAL BODY */}
              <Form />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
