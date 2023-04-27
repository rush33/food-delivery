import { useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

const OrderModal = ({ setIsActive, id }) => {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-60"
        onClick={() => setIsActive(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-2xl p-4 mx-auto bg-white rounded-xl shadow-lg">
          <div className="flex justify-end">
            <button
              className="p-2 text-gray-500 rounded-lg hover:bg-red-100"
              onClick={() => setIsActive(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mx-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
            <h4 className="text-2xl font-bold text-gray-800">Order Id #{id}</h4>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
