import React from 'react'
import { UseSelector, useDispatch } from 'react-redux/es/hooks/useSelector'
import { addToCart, removeFromCart } from '../../reducers/cart'

function cart() {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItemToCart(product));
  }
  
    return (
    <div>
      
    </div>
  )
}

export default cart
