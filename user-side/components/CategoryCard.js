import React from "react";
import { Image, Text, Pressable } from "react-native";

export default function CategoriesCard({ imgUrl, title }) {
  return (
    <Pressable className="relative mr-2 ">
      <Image
        source={{
          uri: imgUrl,
        }}
        className="h-24 w-24 rounded-2xl dr"
      />
      <Text className="absolute bottom-1 left-1 text-white font-bold">
        {title}
      </Text>
    </Pressable>
  );
}
