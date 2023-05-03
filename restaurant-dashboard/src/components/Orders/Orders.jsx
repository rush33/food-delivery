import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import OrdersList from "./OrdersList";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const restaurantId = "5IdiasERdP0Xq0otooZn";

  useEffect(() => {
    const ordersRef = collection(db, "orders");
    const q = query(
      ordersRef,
      where("restaurantId", "==", restaurantId),
      orderBy("createdAt", "desc"),
      where("status", "==", "PENDING")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let item = [];
      querySnapshot.forEach((doc) => {
        item.push({ ...doc.data(), id: doc.id });
      });
      setOrders(item);
      console.log(orders);
    });

    return unsubscribe; // Cleanup function to unsubscribe from real-time updates
  }, []);

  return (
    <>
      <OrdersList orders={orders} />
    </>
  );
};

export default Orders;
