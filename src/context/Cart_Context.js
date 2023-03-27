import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from '../reducer/CartReducer';

const CartContext = createContext();

const getLocalCartData = () => {
    let localCartData = localStorage.getItem("bibekCart");
    // if(localCartData === []) {
    //     return [];
    // } else {
    //     return JSON.parse(localCartData);
    // }
    const parsedData = JSON.parse(localCartData);
    if(!Array.isArray(parsedData)) return [];
    return parsedData;
}

const initialState = {
    cart: getLocalCartData(),
    total_item : "",
    total_price : "",
    shipping_fee : 0,
}

const CartProvider = ({children}) => {

    const [ state, dispatch ] = useReducer(reducer, initialState);

    const addToCart = ( id, color, amount, product ) => {
        dispatch({type:"ADD_TO_CART", payload: { id, color, amount, product }})
    }

    //delete indivisual cart item
    const removeItem = (id) => {
        dispatch({ type : "REMOVE_ITEM", payload: id })
    }

    //clear all cart items
    const clearCart = () => {
        dispatch({ type : "CLEAR_CART"});
    }

    //increment and decrement cart value items
    const setIncrement = (id) => {
        dispatch({ type : "SET_INCREMENT", payload : id });
    }

    const setDecrement = (id) => {
        dispatch({ type : "SET_DECREMENT", payload : id });
    }

    //to store cartitems in local storage
    useEffect(() => {
        // dispatch({ type : "CART_TOTAL_ITEMS"})
        // dispatch({ type : "CART_TOTAL_PRICE"})
        // alternate way to handle above two line of codes in single code
        dispatch({type : "CART_ITEM_PRICE_TOTAL"});
        dispatch({type : "SHIPPING_FEE"});
        localStorage.setItem("bibekCart", JSON.stringify(state.cart));
    },[state.cart]);

    return <CartContext.Provider 
    value={{ ...state, addToCart, removeItem, clearCart, setIncrement, setDecrement }}>
    {children}
    </CartContext.Provider>
}

//custom hook of useContext
const useCartContext = () => {
    return useContext(CartContext);
}

export { CartContext, CartProvider, useCartContext };