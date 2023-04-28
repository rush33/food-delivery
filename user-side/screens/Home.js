import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
import Search from "../components/Search";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const Home = () => {
  const [restaurant, setRestaurant] = useState([]);
  const bottomSheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);

  const snapPoints = useMemo(() => ["50%"], []);

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
    <SafeAreaView className="bg-white pt-4">
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
          <Text onPress={() => setIsOpen(true)} className="font-bold text-xl">
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
      <Search />

      {isOpen && (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          onClose={() => setIsOpen(false)}
        >
          <BottomSheetView>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheet>
      )}
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
        {/* <Text className="mt-4 text-center font-light text-xs">
          Made with ❤ by Rushad
        </Text> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
