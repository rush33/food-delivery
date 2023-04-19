import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";


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
        <ArrowRightIcon color="#00CCBB" />
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
              address={item.address}
              image={item.image}
              lat={item.lat}
              lng={item.lng}
              minDeliveryTime={item.minDeliveryTime}
              maxDeliveryTime={item.maxDeliveryTime}
            />
          );
        })}
        {/* <RestaurantCard
          id={1}
          imgUrl="https://links.papareact.com/gn7"
          title="Atmosphere"
          rating={4.6}
          genre="Fine Dining"
          address="Ranghar Plaza"
          shortDescription="This is a description"
          dishes={[]}
          long={20}
          lat={0}
        />
        <RestaurantCard
          id={2}
          imgUrl="https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant4.jpeg"
          title="Food Infinty"
          rating={4.2}
          genre="Fast Food"
          address="KC Road, Khalihamari"
          shortDescription="This is a description"
          dishes={[]}
          long={20}
          lat={0}
        /> */}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
