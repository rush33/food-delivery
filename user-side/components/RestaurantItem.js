import { View, Text, Image, Pressable } from "react-native";
import {
  MapPinIcon,
  StarIcon,
  SparklesIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

const RestaurantItem = ({
  id,
  title,
  rating,
  address,
  image,
  description,
  genre,
  lat,
  lng,
  minDeliveryTime,
  maxDeliveryTime,
}) => {
  const navigation = useNavigation();
  const DEFAULT_IMAGE = "https://i.postimg.cc/qvhzT8XP/pastry.jpg";

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Restaurant", {
          id
        });
      }}
      className="bg-white my-2 flex-row rounded-2xl border border-gray-200 space-x-1"
    >
      <View className="h-30 w-30 ">
        <Image
          source={{
            uri: image.startsWith("http") ? image : DEFAULT_IMAGE,
          }}
          className="h-36 w-36 rounded-md "
        />
      </View>

      <View className="px-3 pb-4 space-y-1">
        <Text className="font-bold text-xl py-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color="green" opacity={0.5} size={22} />
          <Text className="text-sm text-gray-500">
            <Text className="text-green-500">{rating}</Text> · {minDeliveryTime}{" "}
            - {maxDeliveryTime} mins
          </Text>
        </View>

        <View className="flex-row items-center space-x-1">
          <SparklesIcon color="gold" opacity={0.4} size={22} />
          <Text className="text-sm text-gray-500">{genre}</Text>
        </View>

        <View className="flex-row items-center space-x-1">
          <MapPinIcon color="gray" opacity={0.4} size={22} />
          <Text className="text-sm text-gray-500">{address}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default RestaurantItem;
