import { createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";

// const initialState = {
//   items: [],
// };
const initialState = {
  restaurantId: null,
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    // addToBasket: (state, action) => {
    //   state.items = [...state.items, action.payload];
    // },
    addToBasket: (state, action) => {
      const itemRestaurantId = action.payload.restaurantId;

      if (state.restaurantId === null) {
        // If the basket is empty, set the current restaurant id
        state.restaurantId = itemRestaurantId;
      }

      if (state.restaurantId === itemRestaurantId) {
        // If the item being added belongs to the current restaurant id, add it to the basket
        state.items = [...state.items, action.payload];
      } else {
        Alert.alert(
          "Oops!",
          `You cannot add ${action.payload.name} as it's from a different restaurant.`,
          [
            {
              text: "OK",
              style: "cancel",
            },
          ],
          { cancelable: true }
        );
      }
    },

    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in basket!`
        );
      }

      state.items = newBasket;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectBasketItems = (state) => state.basket.items;

export const selectBasketItemsWithId = (state, id) =>
  state.basket.items.filter((item) => item.id === id);

export const selectBasketTotal = (state) =>
  state.basket.items.reduce((total, item) => (total += item.price), 0);

export default basketSlice.reducer;
