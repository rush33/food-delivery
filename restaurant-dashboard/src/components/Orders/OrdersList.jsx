import { useState } from "react";
import OrderItem from "./OrderItem";
import OrderModal from "./OrderModal";

const OrdersList = ({ orders }) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState("");

  return (
    <>
      {isActive && (
        <OrderModal setIsActive={setIsActive} selectedOrder={selectedOrder} />
      )}
      <div className="max-w-screen-xl mx-auto pt-8 px-4 md:px-8">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-3xl font-bold sm:text-3xl">
              Orders
            </h3>
          </div>
        </div>

        <div className="mt-12 relative h-max overflow-auto">

        {orders.length === 0 ? (
      <div className="text-center">
        <h1 className="font-bold text-gray-700 text-xl">No Pending Orders ❌ </h1>
      </div>
    ) : (
       <table className="w-full table-auto text-sm text-left">
            <thead className="text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 pr-6 text-base">Created At</th>
                <th className="py-3 pr-6 text-base">Order ID</th>
                <th className="py-3 pr-6 text-base">Customer Name</th>
                <th className="py-3 pr-6 text-base">Total</th>
                <th className="py-3 pr-6 text-base">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y-2">
              {orders.map((item, index) => (
                <tr
                  onClick={() => {
                    setIsActive(true);
                    setSelectedOrder({
                      id: item.id,
                      total: item.total,
                      status: item.status,
                    });
                  }}
                  className="cursor-pointer"
                  key={index}
                >
                  <OrderItem
                    setIsActive={setIsActive}
                    date={item.createdAt}
                    id={item.id}
                    firstName={item.userFirstName}
                    lastName={item.userLastName}
                    total={item.total}
                    status={item.status}
                  />
                </tr>
              ))}
            </tbody>
          </table>
    )}

         
        </div>
      </div>
    </>
  );
};

export default OrdersList;
