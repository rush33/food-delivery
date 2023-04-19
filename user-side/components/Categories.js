import { ScrollView, Text } from "react-native";
import React from "react";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  return (
    <ScrollView
      horizontal
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      showsHorizontalScrollIndicator={false}
    >
      {/* Category Card */}
      <CategoryCard
        imgUrl="https://i.postimg.cc/Y0xGVM7b/pizza-crop.jpg"
        title="Pizza"
      />

      <CategoryCard
        imgUrl="https://i.postimg.cc/x1ZkBsrD/burger-crop.jpg"
        title="Burger"
      />
      <CategoryCard
        imgUrl="https://i.postimg.cc/4NTQSx6b/biryani-crop.jpg"
        title="Biryani"
      />
      <CategoryCard
        imgUrl="https://i.postimg.cc/zDTnKYsL/sandwich-crop.jpg"
        title="Sandich"
      />
      <CategoryCard
        imgUrl="https://i.postimg.cc/Zq9NqGP5/pasta-crop.jpg"
        title="Pasta"
      />
      <CategoryCard
        imgUrl="https://i.postimg.cc/LXKJ8n6x/pastry-crop.jpg"
        title="Pastry"
      />
    </ScrollView>
  );
};

export default Categories;
