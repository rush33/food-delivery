import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";


const FeaturedRow = ({ id, title, description }) => {
  const [restaurant, setRestaurant] = useState([]);
  useEffect(() => {
    const getResData = async () => {
      const resRef = collection(db, "restaurants");

      await getDocs(resRef).then((querySnapshot) => {
        let restaurants = [];
        querySnapshot.forEach((doc) => {
          restaurants.push({ ...doc.data(), id: doc.id });
        });
        setRestaurant(restaurants);
      });
    };
    getResData();
  }, []);

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-2xl">{title}</Text>
        <ArrowRightIcon color="#4ade80" />
      </View>

      <Text className="text-sm text-gray-500 px-4">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* Restaurant Cards */}
        {restaurant.map((item, index) => {
          return (
            <RestaurantCard
              key={index}
              id={item.id}
              title={item.name}
              rating={item.rating}
              description={item.description}
              address={item.address}
              image={item.image}
              genre={item.genre}
              lat={item.lat}
              lng={item.lng}
              minDeliveryTime={item.minDeliveryTime}
              maxDeliveryTime={item.maxDeliveryTime}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
