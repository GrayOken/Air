import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';


function cart() {
  const [addItemToCart] = useSelector(state => state.addToCart)
//   const products = useSelector(state => state.data.products);
const dispatch = useDispatch();

const handleAddToCart = (product) => {
   dispatch(addToCart(product));
}

    return (
    <div>

    </div>
  )
}

export default cart
