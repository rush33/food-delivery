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
import { setRestaurant } from "../features/restaurantSlice";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { StatusBar } from "expo-status-bar";

const RestaurantDetails = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [dishes, setDishes] = useState([]);

  const {
    params: {
      id,
      title,
      rating,
      description,
      address,
      image,
      lat,
      lng,
      minDeliveryTime,
      maxDeliveryTime,
    },
  } = useRoute();

  const restaurantUid = id;

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        title,
        rating,
        address,
        description,
        image,
        lat,
        lng,
        minDeliveryTime,
        maxDeliveryTime,
      })
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
    getDishData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
      <StatusBar style="auto" />
      <BasketIcon />

      <ScrollView className="bg-white">
        <View className="relative ">
          <Image
            source={{
              uri: image,
            }}
            className="h-60 w-full bg-gray-200 p-4"
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-14 left-5 bg-white p-2 rounded-full"
          >
            <ArrowLeftIcon size={25} color="#00CCBB" />
          </TouchableOpacity>
        </View>

        <View className="bg-white ">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{title}</Text>
            <View className="flex-row my-1 space-x-2">
              <StarIcon color="green" opacity={0.5} size={22} />
              <Text className="text-sm text-gray-500">
                <Text className="text-green-500">{rating}</Text> ·{" "}
                {minDeliveryTime} - {maxDeliveryTime} mins
              </Text>
            </View>

            <View className="flex-row items-center space-x-1">
              <MapPinIcon color="gray" opacity={0.4} size={22} />
              <Text className="text-sm text-gray-500">{address}</Text>
            </View>
          </View>

          <Text className="text-gray-500 mt-2 pb-4 px-5">{description}</Text>
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
