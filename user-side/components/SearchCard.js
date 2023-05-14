import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import {
  CurrencyRupeeIcon,
  ArrowRightIcon,
  StarIcon,
  MapPinIcon,
  SparklesIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

const SearchCard = ({ results }) => {
  const navigation = useNavigation();
  const id = results.restaurantId ? results.restaurantId : results.id;

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Restaurant", {
          id,
        });
      }}
      className="mx-auto my-4 rounded-2xl w-11/12 h-32 border border-gray-100 space-x-1 flex-row overflow-hidden"
    >
      <View className="h-32 w-32 my-auto">
        <Image
          source={{
            uri: results.image,
          }}
          className="h-32 w-32 rounded-xl"
        />
      </View>

      <View className="px-3 pb-4 space-y-1">
        <Text className="font-bold text-lg py-2">{results.name}</Text>
        {results.price ? (
          <>
            <View className="flex-row items-center space-x-1">
              <CurrencyRupeeIcon color="teal" opacity={0.8} size={25} />
              <Text className="text-sm text-gray-500">
                <Text className="text-gray-700 font-semibold text-base ">
                  {results.price}
                </Text>
              </Text>
            </View>
            <View className="mt-2 flex-row items-center space-x-1">
              <ArrowRightIcon color="teal" opacity={0.8} size={25} />
              <Text className="mt-4 my-auto">Tap to know more</Text>
            </View>
          </>
        ) : (
          <>
            <View className="flex-row items-center space-x-1">
              <StarIcon color="green" opacity={0.5} size={22} />
              <Text className="text-sm text-gray-500">
                <Text className="text-green-500">{results.rating}</Text>
              </Text>
            </View>

            <View className="flex-row items-center space-x-1">
              <SparklesIcon color="gold" opacity={0.4} size={22} />
              <Text className="text-sm text-gray-500">{results.genre}</Text>
            </View>

            <View className="flex-row items-center space-x-1">
              <MapPinIcon color="gray" opacity={0.4} size={22} />
              <Text className="text-sm text-gray-500">{results.address}</Text>
            </View>
          </>
        )}
      </View>
    </Pressable>
  );
};

export default SearchCard;
