import { View, Text, Pressable } from "react-native";
import { ArchiveBoxIcon } from "react-native-heroicons/solid";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import DishInfo from "./DishInfo";

const Order = ({ orderId, status, timestamp, restaurantName, total }) => {
  const [dishes, setDishes] = useState([]);
  const [dishIds, setDishIds] = useState([]);

  let statusText, statusColor;
  const orderTimeStamp = timestamp.toDate();
  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const formattedDate = orderTimeStamp.toLocaleString("en-US", options);

  if (status === "PENDING") {
    statusText = "Order Pending ⏳";
    statusColor = "text-amber-400";
  } else if (status === "ACCEPTED") {
    statusText = "Order Confirmed 🎉";
    statusColor = "text-orange-400";
  } else if (status === "DECLINED") {
    statusText = "Order Declined ❌";
    statusColor = "text-red-500";
  } else if (status === "PREPARING") {
    statusText = "Preparing Food 🍲";
    statusColor = "text-yellow-500";
  } else if (status === "READY") {
    statusText = "Ready for Pickup 🛵";
    statusColor = "text-green-500";
  } else if (status === "DRIVERACCEPTED") {
    statusText = "Delivery Partner Assigned 🚴🏻‍♀️";
    statusColor = "text-green-500";
  } else if (status === "DRIVERPICKEDUP") {
    statusText = "Picked Up by Driver 🏍️";
    statusColor = "text-green-500"; 
  } else if (status === "COMPLETE") {
    statusText = "Delivered ✅";
    statusColor = "text-green-500"; 
  }

  useEffect(() => {
    const getDishId = async () => {
      const dishesRef = collection(db, "orderDishes");
      const q = query(dishesRef, where("orderId", "==", orderId));

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

    getDishId();
  }, []);

  return (
    <View className="flex items-center justify-center">
      <Pressable className="px-6 py-6 mt-4 bg-white w-11/12 h-auto rounded-2xl flex-row justify-between items-center border border-gray-100 shadow shadow-gray-300 ">
        <View className=" w-full">
          <Text className={`font-bold text-2xl ${statusColor}`}>
            {statusText}
          </Text>
          <Text className="text-sm pt-1 text-gray-700">{formattedDate}</Text>
          <Text className="text-sm pt-1 text-gray-700">
            Order ID #{orderId}
          </Text>
          <View>
            {dishes.map((dish) => {
              return (
                <DishInfo
                  key={dish.dishId}
                  id={dish.dishId}
                  quantity={dish.quantity}
                />
              );
            })}
          </View>

          <View className="flex-row justify-between mt-2">
            <Text className="font-semibold text-lg pt-1 text-gray-700">
              Order Total:
            </Text>
            <Text className="font-semibold text-lg pt-1 text-gray-700">
              Rs. {total}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="font-semibold text-lg pt-1 text-gray-700">
              From:
            </Text>
            <Text className="font-semibold text-lg pt-1 text-gray-700">
              {restaurantName}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default Order;
