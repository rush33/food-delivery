import { useState, useEffect } from "react";
import { navigation } from "../data/navigation";
import { navsFooter } from "../data/navsFooter";
import Orders from "./Orders/Orders";
import OrderHistory from "./OrderHistory/OrderHistory";
import Menu from "./Menu/Menu";
import Settings from "./Settings/Settings";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const Sidebar = () => {
  const [active, setActive] = useState(0);
  const [restaurant, setRestaurant] = useState([]);
  const restaurantId = "5IdiasERdP0Xq0otooZn";

  useEffect(() => {
    const getRestaurant = async () => {
      const resRef = doc(db, "restaurants", restaurantId);

      await getDoc(resRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setRestaurant({ ...data, id: docSnapshot.id });
        }
      });
    };

    getRestaurant();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="flex-none w-3/12">
        <nav className="fixed top-0 left-0 w-full h-full border-r bg-white space-y-10 sm:w-80">
          <div className="flex flex-col h-full">
            <div className="h-20 flex items-center px-8">
              <p className="font-bold text-2xl">Dashboard</p>
            </div>
            <div className="flex-1 flex flex-col h-full overflow-auto">
              <ul className="px-4 text-sm font-medium flex-1">
                {navigation.map((item, index) => (
                  <li key={index} onClick={() => setActive(index)}>
                    <div
                      className={`my-3 cursor-pointer flex items-center gap-x-2 text-gray-700 text-base p-2 rounded-xl  hover:bg-green-100 active:bg-green-400 duration-150 ${
                        active === index
                          ? "bg-green-100 border-l-4 border-b-4 border-green-500"
                          : ""
                      } `}
                    >
                      <div className="text-gray-500 cursor-pointer">
                        {item.icon}
                      </div>
                      {item.name}
                    </div>
                  </li>
                ))}
              </ul>
              <div>
                <ul className="px-4 pb-4 text-sm font-medium">
                  {navsFooter.map((item, index) => (
                    <li key={index}>
                      <a className="flex items-center gap-x-2 text-gray-700 text-base p-2 rounded-xl  hover:bg-green-100 active:bg-gray-100 duration-150">
                        <div className="text-gray-500">{item.icon}</div>
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="py-4 px-4 border-t">
                  <div className="flex items-center gap-x-4">
                    <img
                      src={restaurant.image}
                      className="w-16 h-16 object-cover rounded-full"
                    />
                    <div>
                      <span className="block text-gray-700 text-base font-bold">
                        {restaurant.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div className="flex-auto w-64">
        {active === 0 && <Orders />}
        {active === 1 && <Menu />}
        {active === 2 && <OrderHistory />}
        {active === 3 && <Settings />}
      </div>
    </div>
  );
};

export default Sidebar;
