import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import {
  ChevronDownIcon,
  UserIcon,
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import featuredData from "../assets/featuredData.json";
import FeaturedRow from "../components/FeaturedRow";
import RestaurantItem from "../components/RestaurantItem";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
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

  const navigation = useNavigation();

  return (
    <View className="bg-white pt-10">
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-8 w-8 bg-gray-300 p-4 rounded-full"
        />

        <View className="flex-1">
          <Text className="font-bold  text-gray-400 text-sm">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Options");
          }}
        >
          <UserIcon size={35} color="#00CCBB" />
        </TouchableOpacity>
      </View>
      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4 ">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3 rounded-lg">
          <MagnifyingGlassIcon color="gray" size={20} />
          <TextInput
            placeholder="Restaurants and cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsVerticalIcon color="#00CCBB" />
      </View>

      {/* Body */}
      <ScrollView
        className="bg-white"
        contentContainerStyle={{
          paddingBottom: 140,
        }}
      >
        {/* Categores */}
        <Categories />
        {/* Featured Rows */}
        {featuredData.map((item, index) => {
          return (
            <FeaturedRow
              key={index}
              id={item.id}
              title={item.title}
              description={item.description}
              featuredCategory="featured"
            />
          );
        })}
        <View className="px-4">
          <Text className="my-4 font-bold text-2xl">
            Explore all restaurants
          </Text>
          {restaurant.map((item, index) => {
            return (
              <RestaurantItem
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
        </View>
        <Text className="mt-4 text-center font-light text-xs">
          Made with ❤ by Rushad
        </Text>
      </ScrollView>
    </View>
  );
};

export default Home;
