import { View, Text } from "react-native";
import { TextInput } from "react-native";
import {
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";

const Search = ({
  restaurants,
  dishes,
  setSearchInputHasValue,
  setSearchResults,
}) => {

  const filterData = (searchTerm) => {
    if (searchTerm !==
      "") {
      const results = [...restaurants, ...dishes].filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
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
          <MagnifyingGlassIcon color="#4ade80" size={27} />
          <TextInput
            className=" text-gray-600 font-semibold"
            placeholder="Restaurants and dishes..."
            keyboardType="default"
            onChangeText={handleSearchInputChange}
          />
        </View>
      </View>
    </>
  );
};

export default Search;
