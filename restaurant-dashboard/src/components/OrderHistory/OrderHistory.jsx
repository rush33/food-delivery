import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import OrderItem from "../Orders/OrderItem";

const OrderHistory = () => {
   const [orders, setOrders] = useState([]);
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
     <div className="max-w-screen-xl mx-auto pt-8 px-4 md:px-8">
       <div className="items-start justify-between md:flex">
         <div className="max-w-lg">
           <h3 className="text-gray-800 text-3xl font-bold sm:text-3xl">
             Orders
           </h3>
         </div>
       </div>
       <div className="mt-12 relative h-max overflow-auto">
         <table className="w-full table-auto text-sm text-left">
           <thead className="text-gray-600 font-medium border-b">
             <tr>
               <th className="py-3 pr-6 text-base">Date</th>
               <th className="py-3 pr-6 text-base">Order ID</th>
               <th className="py-3 pr-6 text-base">Customer Name</th>
               <th className="py-3 pr-6 text-base">Total</th>
               <th className="py-3 pr-6 text-base">Status</th>
             </tr>
           </thead>
           <tbody className="text-gray-600 divide-y-2 ">
             {orders.map((item, index) => (
               <tr key={index}>
                 <OrderItem
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
       </div>
     </div>
   );
};

export default OrderHistory;
