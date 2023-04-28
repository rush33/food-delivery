import { View, Text } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native';
import {
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";

const Search = () => {
  return (
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
  );
}

export default Search