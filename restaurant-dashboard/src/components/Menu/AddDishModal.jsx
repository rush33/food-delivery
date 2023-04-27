import { useState } from "react";
import {db } from "../../firebase/firebase"
import { collection, addDoc } from "firebase/firestore"; 

const AddDishModal = ({ setIsActive, restaurantId }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, "dishes"), {
      name: name,
      image: image,
      description: description,
      price: price,
      restaurantId: restaurantId,
    });
     setIsActive(false)
  };

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
            <h4 className="text-2xl font-bold text-gray-800">Add Dish</h4>
            <form onSubmit={handleSubmit}>
              <div className="relative my-6">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="w-full pl-2 pr-3 py-2 text-gray-500 bg-transparent outline-none border-2 focus:border-green-500 shadow-sm rounded-lg"
                />
              </div>

              <div className="relative my-6">
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price"
                  className="w-full pl-2 pr-3 py-2 text-gray-500 bg-transparent outline-none border-2 focus:border-green-500 shadow-sm rounded-lg"
                />
              </div>

              <div className="relative my-6">
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Image link"
                  className="w-full pl-2 pr-3 py-2 text-gray-500 bg-transparent outline-none border-2 focus:border-green-500 shadow-sm rounded-lg"
                />
              </div>

              <div className="relative my-6">
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  className="w-full pl-2 pr-3 py-2 text-gray-500 bg-transparent outline-none border-2 focus:border-green-500 shadow-sm rounded-lg"
                />
              </div>

              <button className="w-full my-3 cursor-pointer items-center gap-x-2 text-gray-700 text-base p-2 rounded-xl  hover:bg-green-100 active:bg-green-400 duration-150 bg-green-100 border-l-4 border-b-4 border-green-500">
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDishModal;
