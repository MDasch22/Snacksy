import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkDeleteFromCart, thunkGetCart, thunkUpdateCart } from "../../store/cart";


const Cart = () => {
    const shopping_cart = useSelector(state => state.shoppingCart)
    const cart = useSelector(state => Object.values(state.shoppingCart)[0]);

    const userId = useSelector(state => state.session?.user?.id);
    const [quantity, setQuantity] = useState(1)
    const [snackId, setSnackId] = useState(0)
    let total = 0

    const dispatch = useDispatch();

    // async function handleSubmit(e){
    //     e.preventDefault();

    //     await dispatch(thunkUpdateCart())
    // }
    async function handleSubmit(e) {
        // console.log("@@@@SnackID@@@", snackId)
        e.preventDefault();

        await dispatch(thunkUpdateCart(cart, snackId, quantity))
    }

    useEffect(() => {
        dispatch(thunkGetCart(userId));
    }, [dispatch]);

    console.log('hi cart', cart)
    return (
        <>
            <div>
                {cart && cart.snacks.map(snack => (
                    <div key={snack.id}>
                        <div style={{ 'display': 'none' }}>
                            {total += snack.price}
                        </div>
                        <div>
                            <img src={snack.cover_pic}></img>
                            <p>{snack.title}</p>
                            <p>{snack.price}</p>
                            <button onClick={() => dispatch(thunkDeleteFromCart(cart, snack))}>Remove from cart</button>
                            <form onSubmit={handleSubmit}>
                                <label>Qty</label>
                                <select onChange={(e) => { setQuantity(parseInt(e.target.value)) }}
                                    value={quantity}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </select>
                                <button type="submit" onClick={() => setSnackId(snack.id)}>Update Quantity</button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <p>Total Price: {total}</p>
            </div>
        </>
    )
}

export default Cart;
