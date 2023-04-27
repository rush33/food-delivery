import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import OrderModal from "./OrderModal";
import OrdersList from "./OrdersList";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const restaurantId = "5IdiasERdP0Xq0otooZn";

  useEffect(() => {
    const getOrders = async () => {
      const ordersRef = collection(db, "orders");
      const q = query(
        ordersRef,
        where("restaurantId", "==", restaurantId),
        orderBy("createdAt", "desc")
      );

      await getDocs(q).then((querySnapshot) => {
        let item = [];
        querySnapshot.forEach((doc) => {
          item.push({ ...doc.data(), id: doc.id });
        });
        setOrders(item);
      });
    };

    getOrders();
  }, []);

  return (
    <>
      <OrdersList orders={orders} setIsActive={setIsActive} />
    </>
  );
};

export default Orders;
