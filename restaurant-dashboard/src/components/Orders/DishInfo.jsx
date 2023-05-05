import { useState, useEffect } from "react";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const DishInfo = ({ id, quantity }) => {
  const [dishes, setDishes] = useState({});

  useEffect(() => {
    const getDish = async () => {
      const docRef = doc(db, "dishes", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const items = docSnap.data();
        console.log(items);
        setDishes(items);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    getDish();
  }, []);

  return (
    <div className="flex items-center justify-between space-x-3 bg-white py-4 mt-4">
      <div className="flex items-center justify-evenly  ">
        <div className="font-bold text-2xl text-green-500">
          {quantity} x
        </div>
        <div className="ml-2 font-bold text-2xl pt-1 text-gray-700">
          {dishes.name}
        </div>
      </div>
      <Image
        src={dishes.image}
        alt=""
        width={72}
        height={72}
        className="rounded-full"
      />
    </div>
  );
};

export default DishInfo;
