import { View, Text, Pressable, Image, TouchableOpacity } from "react-native";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import React, { useState } from "react";
import Currency from "react-currency-formatter";
import {
  addToBasket,
  selectBasketItemsWithId,
  removeFromBasket,
} from "../features/basketSlice";
import { useDispatch, useSelector } from "react-redux";

const DishRow = ({ id, name, description, price, image, restaurantId }) => {
  const [isPressed, setIsPressed] = useState(false);

  const dispatch = useDispatch();
  const items = useSelector((state) => selectBasketItemsWithId(state, id));

  // const addItems = () => {
  //   dispatch(addToBasket({ id, name, description, price, image }));
  // };
  const addItems = () => {
    dispatch(
      addToBasket({ id, restaurantId, name, description, price, image })
    );
  };

  const removeItemFromBasket = () => {
    if (!items.length > 0) return;

    dispatch(removeFromBasket({ id }));
  };

  return (
    <>
      <Pressable
        onPress={() => setIsPressed(!isPressed)}
        className="m-2  rounded-3xl bg-white shadow shadow-slate-200 p-4 border border-gray-200"
      >
        <View className="flex-row">
          <View className="flex-1 pr-2 justify-center">
            <Text className="text-xl mb-1 font-semibold">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text className="text-gray-600 mt-3 text-base font-medium">
              <Currency quantity={price} currency="INR" />
            </Text>
          </View>

          <View>
            <Image
              style={{
                borderWidth: 1,
                borderColor: "#F3F3F4",
              }}
              source={{
                uri: image,
              }}
              className="w-28 h-28 bg-gray-300 p-4 rounded-xl"
            />
            <View className="bg-white pt-3">
              <View className="flex-row items-center justify-between ">
                <TouchableOpacity onPress={removeItemFromBasket}>
                  <MinusCircleIcon
                    color={items.length > 0 ? "#4ade80" : "lightgray"}
                    size={42}
                  />
                </TouchableOpacity>

                {items.length === 0 ? (
                  <Text> </Text>
                ) : (
                  <Text>{items.length}</Text>
                )}

                <TouchableOpacity onPress={addItems}>
                  <PlusCircleIcon color="#4ade80" size={42} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </>
  );
};

export default DishRow;
