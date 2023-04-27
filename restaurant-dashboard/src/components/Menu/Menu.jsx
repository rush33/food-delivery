import { db } from "../../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import AddDishModal from "./AddDishModal";
import MenuItem from "./MenuItem";

const Menu = () => {
  const [isActive, setIsActive] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [dishes, setDishes] = useState([]);
  const restaurantId = "5IdiasERdP0Xq0otooZn";

  useEffect(() => {
    const getDishes = async () => {
      const dishesRef = collection(db, "dishes");
      const q = query(dishesRef, where("restaurantId", "==", restaurantId));

      await getDocs(q).then((querySnapshot) => {
        let item = [];
        querySnapshot.forEach((doc) => {
          item.push({ ...doc.data(), id: doc.id });
        });
        setDishes(item);
      });
    };

    getDishes();
    setIsRemoved(false);
  }, [isActive, isRemoved]);

  return (
    <div className="max-w-4xl pt-8 px-4 md:px-8">
      {isActive && (
        <AddDishModal setIsActive={setIsActive} restaurantId={restaurantId} />
      )}
      <MenuItem
        setIsActive={setIsActive}
        dishes={dishes}
        setIsRemoved={setIsRemoved}
      />
    </div>
  );
};

export default Menu;
