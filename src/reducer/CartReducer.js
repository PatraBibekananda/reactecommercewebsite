
const CartReducer = ( state, action ) => {

  if(action.type === "ADD_TO_CART"){
    let { id, color, amount, product } = action.payload;

    // console.log(
    //   "🚀 ~ file: cartReducer.js ~ line 4 ~ cartReducer ~ product",
    //   product
    // );

     //tackle the existing products
     let existingProduct = state.cart.find((curItem) => curItem.id === id + color);

     if(existingProduct) {
        let updatedProduct = state.cart.map((curItem) => {
          if(curItem.id === id + color) {
            let newAmount = curItem.amount + amount;
            if(newAmount >= curItem.max) {
              newAmount = curItem.max;
            }
            return {
              ...curItem,
              amount: newAmount
            }
          } else {
            return curItem;
          }
        })
        return {
          ...state,
          cart: updatedProduct,
        }
     } else {
      let cartProduct = {
        id : id + color,
        name : product.name,
        color,
        amount,
        image : product.image[0].url,
        price : product.price,
        max : product.stock,
    }

    return {
        ...state,
        cart : [...state.cart, cartProduct],
    }
     }
  }

  //increment and decrement items in cart
  if(action.type === "SET_INCREMENT"){
    let updatedProduct = state.cart.map((curItem) => {
      if(curItem.id === action.payload){
        let incAmount = curItem.amount + 1;

        if(incAmount >= curItem.max) {
          incAmount = curItem.max;
        }
        return {
          ...curItem,
          amount: incAmount,
        }
      } else {
        return curItem;
      }
    })
    return {
      ...state,
      cart: updatedProduct,
    }
  } 

  if(action.type === "SET_DECREMENT"){
    let updatedProduct = state.cart.map((curItem) => {
      if(curItem.id === action.payload){
        let decAmount = curItem.amount - 1;

        if(decAmount <= 1) {
          decAmount = 1;
        }
        return {
          ...curItem,
          amount: decAmount,
        }
      } else {
        return curItem;
      }
    })
    return {
      ...state,
      cart: updatedProduct,
    }
  } 

  //to remove/delete indivisual cart item
  if(action.type === "REMOVE_ITEM") {
    let updatedCart = state.cart.filter((curItem) => {
      return curItem.id !== action.payload;
    })
    return {
      ...state,
      cart: updatedCart,
    }
  }

  //to remove/delete all cart items
  if(action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: [],
    }
  }

  //total cart items
  if(action.type === "CART_TOTAL_ITEMS"){
    let updateCartVal = state.cart.reduce((initialVal, curItem) => {
      return initialVal + curItem.amount;
    },0)
    return {
      ...state,
      total_item : updateCartVal,
    }
  }

  //total subitems fee
  if(action.type === "CART_TOTAL_PRICE"){
    let subTotalFee = state.cart.reduce((initialVal, curItem) => {
      return initialVal + (curItem.price * curItem.amount);
    },0)
    return {
      ...state,
      total_price : subTotalFee,
    }
  }

  //shortcut of above two if block into a single if block
  if(action.type === "CART_ITEM_PRICE_TOTAL") {
    let { total_item, total_price, shipping_fee } = state.cart.reduce((accum, curElem) => {
      let { amount, price } = curElem;
      accum.total_item += amount;
      accum.total_price += ( amount * price );
      if(accum.total_price <= 200000){
        accum.shipping_fee = accum.total_price * 5/ 100;
      } else if(accum.total_price <= 500000){
        accum.shipping_fee = 20000;
      } else {
        accum.shipping_fee = 0;
      }
      
      return accum;
    }, {
      total_item : 0,
      total_price : 0,
      shipping_fee : 0,
    })
    return {
      ...state,
      total_item,
      total_price,
      shipping_fee,
    }
  }

  return state ;
}

export default CartReducer