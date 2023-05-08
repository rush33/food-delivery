import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

const DishInfo = ({ id, quantity }) => {
  const [dish, setDish] = useState(null);

  useEffect(() => {
    getDish();
  }, []);

  const getDish = async () => {
    const docRef = doc(db, "dishes", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setDish(data);
    } else {
      console.log("No such document!");
    }
  };
  if (!dish) {
    return <View />;
    }
    
  return (
    <View style={styles.orderDetailsContainer}>
      <Text style={styles.orderItemText}>{dish.name}</Text>
      <Text style={styles.orderItemText}>x {quantity}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  orderDetailsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderItemText: {
    fontSize: 20,
    color: "grey",
    fontWeight: "500",
    letterSpacing: 0.5,
    marginBottom: 5,
  },
});

export default DishInfo;
