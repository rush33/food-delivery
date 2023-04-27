import { db } from "../../firebase/firebase";

import { doc, deleteDoc } from "firebase/firestore";

const MenuItem = ({ setIsActive, dishes, setIsRemoved }) => {
  const handleRemove = async (id) => {
    await deleteDoc(doc(db, "dishes", id));
    setIsRemoved(true);
  };

  return (
    <>
      <div className="items-start justify-between sm:flex">
        <div>
          <h4 className="text-gray-800 text-3xl font-bold">Menu</h4>
        </div>
        <div
          onClick={() => setIsActive(true)}
          className="cursor-pointer inline-flex items-center justify-center gap-1 py-2 px-3 mt-2 font-medium text-sm text-center text-gray-700 bg-green-100 border-l-4 border-b-4 border-green-500 hover:bg-green-100 active:bg-green-400 duration-150 rounded-xl sm:mt-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m6-6H6"
            />
          </svg>
          Add Dish
        </div>
      </div>
      <ul className="mt-12 divide-y">
        {dishes.map((item, index) => (
          <li key={index} className="py-5 flex items-start justify-between">
            <div className="flex gap-3">
              <img
                src={item.image}
                className="flex-none w-20 h-20 rounded-xl object-cover"
              />
              <div>
                <span className="block text-lg text-gray-700 font-bold">
                  {item.name}
                </span>
                <span className="block text-lg text-gray-600">
                  Rs. {item.price}
                </span>
              </div>
            </div>
            <div
              onClick={(i) => handleRemove(item.id)}
              className="cursor-pointer p-2 text-sm font-semibold text-red-600 bg-red-100 border-l-4 border-b-4 border-red-400 hover:bg-red-100 active:bg-red-400 duration-150 rounded-xl"
            >
              Remove
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MenuItem;
