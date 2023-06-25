import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Currency from "react-currency-formatter";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { selectRestaurant } from "../features/restaurantSlice";
import { selectUser } from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { XCircleIcon } from "react-native-heroicons/solid";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basketSlice";
import { UserAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import {
  doc,
  setDocs,
  collection,
  addDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";



const BasketScreen = () => {
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);
  const restaurant = useSelector(selectRestaurant);
  const dbUser = useSelector(selectUser);
  const items = useSelector(selectBasketItems);
  const [groupItemsInBucket, setGroupItemsInBucket] = useState([]);
  const dispatch = useDispatch();
  const { user } = UserAuth();

  useEffect(() => {
    const groupItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupItemsInBucket(groupItems);
  }, [items]);

  
  const ordersCollection = collection(db, "orders");
  const orderDishesCollection = collection(db, "orderDishes");

  const createOrder = async () => {
    const newOrderRef = await addDoc(ordersCollection, {
      restaurantName: restaurant.name,
      restaurantId: restaurant.id,
      restaurantAddress: restaurant.address,
      restaurantImage: restaurant.image,
      restaurantLatitude: restaurant.lat,
      restaurantLongitude: restaurant.lng,
      userId: user.uid,
      userFirstName: dbUser.firstName,
      userLastName: dbUser.lastName,
      userLatitude: dbUser.latitude,
      userLongitude: dbUser.longitude,
      userAddress: dbUser.address,
      userPhoneNumber: dbUser.phoneNumber,
      status: "PENDING",
      total: basketTotal + deliveryFee,
      createdAt: serverTimestamp(),
    });

    await Promise.all(
      Object.entries(groupItemsInBucket).map(([key, items]) => {
        return setDoc(doc(orderDishesCollection, `${newOrderRef.id}_${key}`), {
          quantity: items.length,
          orderId: newOrderRef.id,
          dishId: key,
        });
      })
    );

    navigation.navigate("PreparingOrderScreen");
  };

  console.log("Res:", restaurant);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-50">
        <View className="p-3 border-b border-[#4ade80] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon color="#4ade80" height={50} width={50} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5 border border-gray-100">
          <Image
            source={{
              uri: "https://www.pngitem.com/pimgs/m/533-5338534_motor-21-philosophychicchic-home-delivery-service-bike-hd.png",
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">
            Deliver in {restaurant.minDeliveryTime}-{restaurant.maxDeliveryTime}{" "}
            min
          </Text>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupItemsInBucket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5 border-top border-gray-100"
            >
              <Text className="text-[#22c55e]">{items.length} x</Text>
              <Image
                source={{ uri: restaurant.image }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-600">
                <Currency quantity={items[0]?.price} currency="INR" />
              </Text>
              <TouchableOpacity>
                <Text
                  className="text-[#22c55e] text-xs"
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="flex-row items-center top-4 space-x-4 px-4 py-3 bg-white my-5 border border-gray-100">
          <Image
            source={{
              uri: "https://img.icons8.com/?size=512&id=76948&format=png",
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Cash on Delivery</Text>
          <View>
            <Text className="text-gray-300">Change</Text>
          </View>
        </View>

        <View className="p-5 bg-white mt-5 space-y-4 border-top border-gray-100">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">SubTotal</Text>
            <Text className="text-gray-400">
              <Currency quantity={basketTotal} currency="INR" />
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">
              <Currency
                quantity={(deliveryFee = basketTotal === 0 ? 0 : 40)}
                currency="INR"
              />
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text>Order Total</Text>
            <Text className="font-extrabold">
              <Currency quantity={basketTotal + deliveryFee} currency="INR" />
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              createOrder();
            }}
            className="rounded-2xl p-3 hover:bg-green-200 active:bg-green-400 duration-150 bg-green-300 border-l-4 border-b-4 border-green-600"
          >
            <Text className="text-center text-gray-700 font-extrabold text-xl">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
