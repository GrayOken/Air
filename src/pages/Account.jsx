import { useGetUsersCartsQuery } from "../reducers/api";
import { useSelector } from "react-redux";
import ProductCard from "../components/Products/ProductCard";

function Account() {
    const products = useSelector(state => state.data.products);
    const me = useSelector(state => state.auth.credentials.user);
    const { data: carts, isLoading } = useGetUsersCartsQuery(me.userId);

    const inactiveCarts = carts ? carts.filter(cart => !cart.is_cart): [];
    return (
        <>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : inactiveCarts.length === 0 ? (
                <h1>You have no orders</h1>
            ) : (
                <>
                    <h1>{me.username}'s Orders</h1>
                    {inactiveCarts.map(order => (
                        <div key={order.id}>
                            {order.CartProduct && order.CartProduct.length > 0 ? (
                                order.CartProduct.map(cartProduct => {
                                 console.log(order.CartProduct)
                                    const matched = products.find(prod => prod.id === cartProduct.product_id);
                                    return (
                                        <div key={cartProduct.id}>
                                            <h2>Purchase Order ID: {cartProduct.id}</h2>
                                            {matched && <h3>Product Name: {matched.name}</h3>}
                                            <h3>Quantity: {cartProduct.quantity}</h3>
                                            <img src={matched.image_url} className="product-card-image" />
                                        </div>
                                    );
                                })
                            ) : (
                                <h2>Nothing in this order</h2>
                            )}
                        </div>
                    ))}
                </>
            )}
        </>
    );
}

export default Account;
