import { PRODUCTS } from '../../data/dummy-data';
import { ADD_CART } from '../actions/products'
import { DELETE_CART } from '../actions/products'
import { DEL_LISTING } from '../actions/products'
import { NEW_LISTING } from '../actions/products'
import { EDIT_LISTING } from '../actions/products'
import { SET_PRODUCTS } from '../actions/products'
import { PLACE_ORDER } from '../actions/products'
import Product from '../../models/product'

const initialState = {
  products: PRODUCTS,
  cart: [],
  counter: [],
  sumCart: 0,
  orders: [],
}

const productReducer = (state = initialState, action) => {
  switch(action.type){
    case ADD_CART:
      const productToAdd = state.products.find(product => product.id === action.productId);
      const isInCart = state.cart.some(product => product === productToAdd);

      if(isInCart === true){
        const newNum = state.counter.find(product => product.product === productToAdd.id)
        const objIndex = state.counter.findIndex(product => product.product === productToAdd.id)

        const updatedCounter = [...state.counter]
        updatedCounter[objIndex].number += 1
        const price = productToAdd.price;

        return {...state, counter: updatedCounter, sumCart: state.sumCart += price}
      }
      else{
        const price = productToAdd.price;
        return { ...state, cart: state.cart.concat(productToAdd), counter: state.counter.concat({product: productToAdd.id, number: 1}), sumCart: state.sumCart += price}
      }

    case DELETE_CART:
      const productToRemove = state.cart.find(product => product.id === action.productId);
      const objIndex = state.counter.findIndex(product => product.product === productToRemove.id);
      const price = productToRemove.price

      if(state.counter[objIndex].number >= 2){
        //Updating counter
        const updatedCounter = [...state.counter]
        updatedCounter[objIndex].number -= 1

        return { ...state, counter: updatedCounter, sumCart: state.sumCart -= price}
      }
      else{
        //Updating counter
        const updateCount = [...state.counter]
        updateCount[objIndex].number -= 1
        //Updating cart
        const updatedCounter = [...state.cart]
        const updatedcounterIndex = updatedCounter.findIndex(product => product.id === productToRemove.id)
        updatedCounter.splice(updatedcounterIndex, 1)

        return { ...state, cart: updatedCounter, sumCart: state.sumCart -= price, counter: updateCount}
      }

    case DEL_LISTING:
      const copyProducts = [...state.products]
      const yourProductToDelete = copyProducts.find(product => product.id === action.productId)
      const index = copyProducts.findIndex(product => product.id === yourProductToDelete.id)

      copyProducts.splice(index, 1)

      return {...state, products: copyProducts}

    case EDIT_LISTING:
      const productToEdit = state.products.find(product => product.id === action.productId)
      const copyState = [...state.products]
      const productIndex = copyState.findIndex(product => product.id === productToEdit.id)

      const updatedProduct = copyState[productIndex]
      updatedProduct.name = action.name
      updatedProduct.description = action.description

      copyState.splice(productIndex, 1, updatedProduct);

      return { ...state, products: copyState }

    case NEW_LISTING:
      const currState = [...state.products]

      const newProduct = new Product(
      action.productId,
      'u1',
      'Alfred Johansen',
      action.name,
      action.url,
      action.description,
      action.price)
      currState.push(newProduct)

      return { ...state, products: currState}

    case SET_PRODUCTS:
      return {
      products: action.products,
      cart: [],
      counter: [],
      sumCart: 0,
      orders: []
    }
    case PLACE_ORDER:
      const productsToOrder = [...state.cart]
      const orders = [...state.orders]
      const updatedOrder = orders.concat(productsToOrder)
      return { ...state, orders: updatedOrder, cart: [], sumCart: 0, counter: [] }
  }
  return state;
}

export default productReducer;
