import { useState, useEffect } from "react";
import DishInfo from "./DishInfo";
import { db } from "../../firebase/firebase";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import StatusButton from "./StatusButton";

const OrderModal = ({ setIsActive, selectedOrder }) => {
  const [dishes, setDishes] = useState([]);
  const [status, setStatus] = useState("PENDING");

  useEffect(() => {
    const getDishId = async () => {
      const dishesRef = collection(db, "orderDishes");
      const q = query(dishesRef, where("orderId", "==", selectedOrder.id));

      await getDocs(q).then((querySnapshot) => {
        let dishIds = [];
        let items = [];
        // querySnapshot.forEach((doc) => {
        //   dishIds.push(doc.data().dishId);
        // });
        querySnapshot.forEach((doc) => {
          items.push({ ...doc.data() });
        });
        // setDishIds(dishIds);
        setDishes(items);
      });
    };

    const orderRef = doc(db, "orders", selectedOrder.id);
    updateDoc(orderRef, {
      status: status
    });

    getDishId();
  }, [status]);

  let statusText, statusColor;
  if (status === "PENDING") {
    statusText = "Order Pending ⏳";
    statusColor = "text-yellow-400";
  } else if (status === "ACCEPTED") {
    statusText = "Order Confirmed 🍽";
    statusColor = "text-orange-500";
  } else if (status === "DECLINED") {
    statusText = "Order Declined ❌";
    statusColor = "text-red-500";
  } else if (status === "PREPARING") {
    statusText = "Preparing Food 🍲";
    statusColor = "text-yellow-500";
  } else if (status === "READY") {
    statusText = "Ready for Pickup 🛵";
    statusColor = "text-green-500";
  } else if (status === "PICKEDUP") {
    statusText = "Picked Up by Driver 🚲";
    statusColor = "text-green-500"; // green
  } else if (status === "COMPLETE") {
    statusText = "Delivered ✅";
    statusColor = "text-green-500"; // green
  }

  console.log("status:", status)

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-60"
        onClick={() => setIsActive(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-2xl p-4 mx-auto bg-white rounded-2xl shadow-lg">
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
            <h4 className="text-xl font-bold text-gray-500">
              Order #{selectedOrder.id}
            </h4>
            <h4 className="text-xl font-bold text-gray-500">
              Current Status:{" "}
              {statusText && <span className={statusColor}>{statusText}</span>}
            </h4>
          </div>

          <div className="flex flex-col gap-y-2">
            <div className="flex flex-col gap-y-1">
              <div>
                {dishes.map((dish) => {
                  return (
                    <DishInfo
                      key={dish.dishId}
                      id={dish.dishId}
                      quantity={dish.quantity}
                    />
                  );
                })}
              </div>

              <div className="w-full flex py-4 justify-around font-bold text-lg text-gray-700">
                <div>Total:</div>
                <div>Rs. {selectedOrder.total}</div>
              </div>

              <div className="flex justify-between items-center">
                {status === "PENDING" && (
                  <>
                    <div className="w-2/4">
                      <button
                        onClick={() => setStatus("ACCEPTED")}
                        className=" w-11/12 my-3 cursor-pointer items-center gap-x-2 text-gray-700 font-bold text-base p-2 rounded-xl  hover:bg-green-200 active:bg-green-400 duration-150 bg-green-200 border-l-4 border-b-4 border-green-500"
                      >
                        Accept
                      </button>
                    </div>
                    <div className="w-2/4">
                      <button
                        onClick={() => { setStatus("DECLINED") }}
                        className=" w-11/12 my-3 cursor-pointer items-center gap-x-2 text-gray-700 font-bold text-base p-2 rounded-xl  hover:bg-red-200 active:bg-red-400 duration-150 bg-red-200 border-l-4 border-b-4 border-red-500"
                      >
                        Decline
                      </button>
                    </div>
                  </>
                )}
                {status === "ACCEPTED" && (
                  <div className="w-2/4 mx-auto">
                    <button
                      onClick={() => setStatus("PREPARING")}
                      className=" w-11/12 my-3 cursor-pointer items-center gap-x-2 text-gray-700 font-bold text-base p-2 rounded-xl  hover:bg-yellow-200 active:bg-yellow-400 duration-150 bg-yellow-200 border-l-4 border-b-4 border-yellow-500"
                    >
                      Preparing Food
                    </button>
                  </div>
                )}
                {status === "PREPARING" && (
                  <div className="w-2/4 mx-auto">
                    <button
                      onClick={() => { setStatus("READY") }}
                      className=" w-11/12 my-3 cursor-pointer items-center gap-x-2 text-gray-700 font-bold text-base p-2 rounded-xl  hover:bg-green-200 active:bg-green-400 duration-150 bg-green-200 border-l-4 border-b-4 border-green-500"
                    >
                      Ready for Pickup
                    </button>
                  </div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
