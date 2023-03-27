import React from 'react'
import FormatPrice from '../Helper/FormatPrice'
import CartAmountToggle from './CartAmountToggle'
import { FaTrash } from "react-icons/fa";
import { useCartContext } from '../context/Cart_Context';
// import { useProductContext } from '../context/ProductContext';


// const API = "https://api.pujakaitem.com/api/products";

const CartItem = ({id, name, image, color, price, amount}) => {

    const { removeItem, setIncrement, setDecrement } = useCartContext();

  return (
    <div className='cart_heading grid grid-five-column'>
        <div className='cart-image--name'>
            <div>
                <figure>
                    <img src={image} alt={id} />
                </figure>
            </div>
            <div>
                <p>{name}</p>
                <div className='color-div'>
                    <p>color:</p>
                    <div className='color-style' style={{backgroundColor:color, color:color}}>
                    </div>
                </div>
            </div>
        </div>
        <div className='cart-hide'>
            <p><FormatPrice price={price} /></p>
        </div>
        <div>
        <CartAmountToggle amount={amount} setDecrease={() => setDecrement(id)} setIncrease={() => setIncrement(id)} />
        </div>
        <div className='cart-hide'>
        <p><FormatPrice price = { price * amount} /></p>
        </div>
        <div>
            <FaTrash className="remove_icon" onClick={() => removeItem(id)} />
        </div>
    </div>
  )
}

export default CartItem