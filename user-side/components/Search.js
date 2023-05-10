import { View, Text } from "react-native";
import { useState } from "react";
import { TextInput } from "react-native";
import {
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import SearchCard from "./SearchCard";

const Search = ({
  restaurants,
  dishes,
  setSearchInputHasValue,
  setSearchResults,
}) => {
  // const combinedArray = restaurants.map((restaurant) => {
  //   const restaurantDishes = dishes.filter(
  //     (dish) => dish.restaurantId === restaurant.id
  //   );
  //   return { ...restaurant, dishes: restaurantDishes };
  // });

  const filterData = (searchTerm) => {
    if (searchTerm === "") {
      setSearchResults([]);
    } else {
      const results = [...restaurants, ...dishes].filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
      // console.log("Results:",results);
    }
  };

  const handleSearchInputChange = (value) => {
    setSearchInputHasValue(value.length > 0);
    filterData(value);
  };

  return (
    <>
      <View className="flex-row items-center space-x-2 pb-2 mx-4 ">
        <View className="flex-row flex-1 space-x-2 bg-gray-100 p-3 rounded-xl">
          <MagnifyingGlassIcon color="gray" size={25} />
          <TextInput
            className=" text-gray-600 font-semibold"
            placeholder="Restaurants and dishes..."
            keyboardType="default"
            onChangeText={handleSearchInputChange}
          />
        </View>
        {/* <AdjustmentsVerticalIcon color="#00CCBB" /> */}
      </View>
    </>
  );
};

export default Search;
