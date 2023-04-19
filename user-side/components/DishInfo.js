import { View, Text, Image } from "react-native";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const DishInfo = ({ id, quantity }) => {
  const [dish, setDish] = useState([]);
  useEffect(() => {
    const getDish = async () => {
      const docRef = doc(db, "dishes", id);
      await getDoc(docRef).then((querySnapshot) => {
        let item = [];
        querySnapshot.forEach((doc) => {
          item.push({ ...doc.data(), id: doc.id });
        });
        console.log(item);
      });
    };
    getDish();
  }, []);

  return (
    <View className="flex-row items-center space-x-3 bg-white py-2 px-5">
      <Text className="text-[#00CCBB]">{quantity} x</Text>
      {/* <Image
        source={{ uri: dish.image }}
        className="h-12 w-12 rounded-full"
      /> */}
      {/* <Text>{dish.name}</Text> */}
    </View>
  );
};

export default DishInfo;
