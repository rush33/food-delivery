import { View, Text, Image } from "react-native";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const DishInfo = ({ id, quantity }) => {
  console.log(id, quantity);
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
    <View className="flex-row items-center space-x-3 bg-white py-2 mt-4">
      <Text className="font-semibold text-base text-[#00CCBB]">
        {quantity} x
      </Text>
      <Image
        source={{ uri: dishes.image }}
        className="h-12 w-12 rounded-full"
      />
      <Text className="font-semibold text-base pt-1 text-gray-700">
        {dishes.name}
      </Text>
    </View>
  );
};

export default DishInfo;
