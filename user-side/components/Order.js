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

  if (status === "NEW") {
    statusText = "Order Cofirmed 🍔";
    statusColor = "text-orange-400"; // orange
  } else if (status === "PREPARING") {
    statusText = "Preparing Food 🍲";
    statusColor = "text-[#00CCBB]"; // orange
  } else if (status === "ON THE WAY") {
    statusText = "On the way 🚚";
    statusColor = "text-[#00CCBB]"; // green
  } else if (status === "COMPLETE") {
    statusText = "Delivered ✅";
    statusColor = "text-green-500"; // green
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
      <Pressable className="px-6 py-6 mt-4 bg-white w-11/12 h-auto rounded-2xl flex-row justify-between items-center border border-gray-100 shadow-xl shadow-gray-400 ">
        <View className=" w-full">
          <Text className={`font-semibold text-2xl ${statusColor}`}>
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
          <Text className="font-semibold text-lg pt-1 text-gray-700">Order Total: {total}</Text>
          <Text className="font-semibold text-lg pt-1 text-gray-700">From {restaurantName}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Order;
