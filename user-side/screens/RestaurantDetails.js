import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  StarIcon,
} from "react-native-heroicons/solid";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setRestaurant } from "../features/restaurantSlice";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { StatusBar } from "expo-status-bar";

const RestaurantDetails = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [dishes, setDishes] = useState([]);
  const [restaurantInfo, setRestaurantInfo] = useState([]);

  const {
    params: { id },
  } = useRoute();

  const restaurantUid = id;

  useEffect(() => {
    getDishData();
    dispatch(
      setRestaurantAsync({
        restaurantUid,
      })
    );
  }, []);

  const setRestaurantAsync = createAsyncThunk(
    "restaurant/set",
    async ({ restaurantUid }, { dispatch }) => {
      const docRef = doc(db, "restaurants", restaurantUid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const items = docSnap.data();
        setRestaurantInfo(items);
        dispatch(
          setRestaurant({
            id: restaurantUid,
            name: items.name,
            rating: items.rating,
            address: items.address,
            description: items.description,
            image: items.image,
            lat: items.lat,
            lng: items.lng,
            minDeliveryTime: items.minDeliveryTime,
            maxDeliveryTime: items.maxDeliveryTime,
          })
        );
      }
    }
  );

  const getDishData = async () => {
    const dishRef = collection(db, "dishes");

    const q = query(dishRef, where("restaurantId", "==", restaurantUid));

    await getDocs(q).then((querySnapshot) => {
      let item = [];
      querySnapshot.forEach((doc) => {
        item.push({ ...doc.data(), id: doc.id });
      });
      setDishes(item);
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  console.log(restaurantInfo);

  return (
    <>
      <StatusBar style="auto" />
      <BasketIcon />

      <ScrollView className="bg-white">
        <View className="relative ">
          <Image
            source={{
              uri: restaurantInfo.image,
            }}
            className="h-60 w-full bg-gray-200 p-4"
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-14 left-5 bg-white p-2 rounded-full"
          >
            <ArrowLeftIcon size={25} color="#22c55e" />
          </TouchableOpacity>
        </View>

        <View className="bg-white ">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{restaurantInfo.name}</Text>
            <View className="flex-row my-1 space-x-2">
              <StarIcon color="green" opacity={0.5} size={22} />
              <Text className="text-sm text-gray-500">
                <Text className="text-green-500">{restaurantInfo.rating}</Text>{" "}
                · {restaurantInfo.minDeliveryTime} -{" "}
                {restaurantInfo.maxDeliveryTime} mins
              </Text>
            </View>

            <View className="flex-row items-center space-x-1">
              <MapPinIcon color="gray" opacity={0.4} size={22} />
              <Text className="text-sm text-gray-500">
                {restaurantInfo.address}
              </Text>
            </View>
          </View>

          <Text className="text-gray-500 mt-2 pb-4 px-5">
            {restaurantInfo.description}
          </Text>
        </View>

        <View className="pb-36">
          <Text className="px-4 pt-2 mb-3 font-bold text-xl">Menu</Text>

          {dishes.map((dish, index) => {
            return (
              <DishRow
                key={index}
                restaurantId={dish.restaurantId}
                id={dish.id}
                name={dish.name}
                description={dish.description}
                price={dish.price}
                image={dish.image}
              />
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantDetails;
