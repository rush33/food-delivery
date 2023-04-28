import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import Order from "../components/Order";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { UserAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import OptionsScreen from './OptionsScreen';

const OrderDetailsScreen = () => {
  const { user } = UserAuth();
  const navigation = useNavigation();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const ordersRef = collection(db, "orders");
      const q = query(
        ordersRef,
        where("userId", "==", user.uid),
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
      <StatusBar style="dark" />

      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 bg-white">
          <View className="p-5 bg-white shadow-xs">
            <TouchableOpacity
              onPress={navigation.goBack}
              className="absolute top-4 left-4 bg-white p-2 rounded-full"
            >
              <ArrowLeftIcon size={30} color="#00CCBB" />
            </TouchableOpacity>

            <View>
              <Text className="text-xl font-bold text-center">My Orders</Text>
            </View>
          </View>

          {orders.length === 0 && (
            <View className="flex-1 bg-white justify-center items-center">
              <Text className="text-xl font-bold">You have no orders 🚫</Text>
            </View>
          )}

          {orders.map((order, index) => {
            return (
              <Order
                key={index}
                orderId={order.id}
                status={order.status}
                restaurantId={order.restaurantId}
                restaurantName={order.restaurantName}
                total={order.total}
                timestamp={order.createdAt}
              />
            );
          })}
        </View>
      </SafeAreaView>
    </>
  );
};

export default OrderDetailsScreen;
