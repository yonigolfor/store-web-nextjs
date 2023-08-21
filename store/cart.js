import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  productsList: [
    // {
    //   name: "test",
    //   counter: 1,
    //   pricePerUnit: 0,
    //   image: "someUrl",
    //   description: "description of product",
    // },
  ], // image, description
  totalPrice: 0,

  // possibility to add here the data of discountPercent, deliveryStyle
  discountPercent: null,
  deliveryData: { deliveryString: "", deliveryPrice: null },
  //
  allProductsAvailable: [],
};

function findProduct(productsList, productName) {
  return productsList.findIndex((product) => product.name === productName);
}
function calculateTotalPrice(productsList) {
  const convertedToArray = JSON.parse(JSON.stringify(productsList));
  let sum = 0;
  for (let i = 0; i < convertedToArray.length; i++) {
    sum += convertedToArray[i].counter * convertedToArray[i].pricePerUnit;
  }
  return sum;
}

function priceAfterDiscount(totalPrice, discountPercent) {
  const percent = 1 - discountPercent / 100;
  return Math.ceil(totalPrice * percent);
}

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addProduct(state, action) {
      // payload = {productName, pricePerUnit, image, description}
      // check if already exist => counter ++
      const index = findProduct(state.productsList, action.payload.name);
      // const isExist = state.productsList.findIndex(
      //   (product) => product.name === action.payload.name
      // );
      if (index !== -1) {
        // product FOUND:
        state.productsList[index].counter++;
      } else {
        // if not exist add to array and counter = 1
        state.productsList.push({
          name: action.payload.name,
          counter: 1,
          pricePerUnit: action.payload.price,
          image: action.payload.image,
          description: action.payload.description,
        });
      }
      state.totalPrice += action.payload.price;
    },
    removeProduct(state, action) {
      // find product
      const index = findProduct(state.productsList, action.payload.name);
      if (index === -1) {
        // shouldn't happen never
        console.log("Couldnt remove product");
        return;
      }
      state.productsList[index].counter > 1
        ? state.productsList[index].counter--
        : state.productsList.splice(index, 1);

      state.totalPrice -= action.payload.price;
    },
    updateCounter(state, action) {
      // payload: {productName, updatedCounter}
      // find place in list
      const index = findProduct(state.productsList, action.payload.productName);
      if (index === -1) {
        console.log("Problem Occured Not finding the product in list");
        return;
      }
      // update the counter
      action.payload.updatedCounter > 0
        ? (state.productsList[index].counter = action.payload.updatedCounter)
        : state.productsList.splice(index, 1);

      // update totalPrice
      const totalPrice = calculateTotalPrice(state.productsList);
      state.totalPrice = totalPrice;
    },
    setDeliveryData(state, action) {
      // payload = value => {deliveryString, deliveryPrice}
      state.deliveryData = action.payload;
    },
    setDiscountPercent(state, action) {
      // payload = discount percent
      state.discountPercent = action.payload;
      // update the totalPrice after discount
      // OR NOT CUZ THEN I HAVE TO ADD THE DELIVERY PRIRCE
      state.totalPrice = priceAfterDiscount(
        state.totalPrice,
        state.discountPercent
      );
    },

    setTotalPrice(state, action) {
      state.totalPrice = action.payload;
    },
    addDeliveryPrice(state, action) {
      if (state.discountPercent) {
        state.totalPrice += priceAfterDiscount(
          action.payload,
          state.discountPercent
        );
      } else state.totalPrice += action.payload;
    },

    setAllProductsAvailable(state, action) {
      state.allProductsAvailable = action.payload;
    },
    addProductToAllProductsAvailable(state, action) {
      state.allProductsAvailable = [
        action.payload,
        ...state.allProductsAvailable,
      ];
    },
    // increase(state, action) {
    //   state.counter += action.payload;
    // },
    // toggleCounter(state) {
    //   state.isShow = !state.isShow;
    // },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
