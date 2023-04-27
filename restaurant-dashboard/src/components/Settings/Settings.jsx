import { useState } from "react";
import { db } from "../../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

const Settings = () => {
  const [restaurantData, setRestaurantData] = useState({
    name: "",
    image: "",
    address: "",
    genre: "",
  });
  const restaurantId = "5IdiasERdP0Xq0otooZn";

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRestaurantData({
      ...restaurantData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToUpdate = {};

    // Loop through the fields and add non-empty ones to the update object
    for (const [key, value] of Object.entries(restaurantData)) {
      if (value.trim() !== "") {
        dataToUpdate[key] = value;
      }
    }

    try {
      const resRef = doc(db, "restaurants", restaurantId);
      await updateDoc(resRef, dataToUpdate);
      console.log("Restaurant details updated successfully");
    } catch (error) {
      console.log("Error updating restaurant details:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-2xl pt-8 px-4 md:px-8">
        <div className="items-start justify-between sm:flex">
          <h4 className="text-gray-800 text-3xl font-bold">
            Edit restaurant details
          </h4>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-y-12 ">
          <div className="mx-auto max-w-md rounded-3xl bg-white shadow-md">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900">Name</h3>
              <input
                type="text"
                name="name"
                value={restaurantData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-2xl py-2 px-3 mt-4 focus:outline-none focus:ring focus:ring-green-200 focus:border-green-300"
                placeholder="Enter restaurant name"
              />
            </div>
          </div>
          <div className="mx-auto max-w-md rounded-3xl bg-white shadow-md">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900">Image</h3>
              <input
                type="text"
                name="image"
                value={restaurantData.image}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-2xl py-2 px-3 mt-4 focus:outline-none focus:ring focus:ring-green-200 focus:border-green-300"
                placeholder="Enter Image link"
              />
            </div>
          </div>
          <div className="mx-auto max-w-md rounded-3xl bg-white shadow-md">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900">Address</h3>
              <input
                type="text"
                name="address"
                value={restaurantData.address}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-2xl py-2 px-3 mt-4 focus:outline-none focus:ring focus:ring-green-200 focus:border-green-300"
                placeholder="Enter restaurant address"
              />
            </div>
          </div>
          <div className="mx-auto max-w-md rounded-3xl bg-white shadow-md">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900">Genre</h3>
              <input
                type="text"
                name="genre"
                value={restaurantData.genre}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-2xl py-2 px-3 mt-4 focus:outline-none focus:ring focus:ring-green-200 focus:border-green-300"
                placeholder="Enter restaurant genre"
              />
            </div>
          </div>

          <button className="ml-6 w-full my-3 cursor-pointer items-center gap-x-2 text-gray-700 font-semibold text-base p-2 rounded-xl  hover:bg-green-100 active:bg-green-400 duration-150 bg-green-100 border-l-4 border-b-4 border-green-500">
            Update Details
          </button>
        </div>
      </div>
    </form>
  );
}

export default Settings