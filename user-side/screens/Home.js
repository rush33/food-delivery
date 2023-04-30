import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserAuth } from "../contexts/AuthContext";
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
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import Search from "../components/Search";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";

const Home = () => {
  const { user } = UserAuth();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [restaurant, setRestaurant] = useState([]);
  const bottomSheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);
  const [userData, setUserData] = useState([]);
  const snapPoints = useMemo(() => ["50%"], []);

  useEffect(() => {
    getUserData();
    getResData();
  }, []);

  const getUserData = async () => {
    const userRef = doc(db, "user", user.uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const items = [{ ...docSnap.data(), id: docSnap.id }];
      console.log(items);
      // setUserData(items);
      dispatch(
        setUser({
          uid: user.uid,
          firstName: items[0].firstName,
          lastName: items[0].lastName,
          phoneNumber: items[0].phoneNumber,
          address: items[0].address,
          latitude: items[0].latitude,
          longitude: items[0].longitude,
        })
      );
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

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
                description={item.description}
                address={item.address}
                genre={item.genre}
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
