import { totalPrice } from "../../units/total-price"
import Button from "../Button/Button"
import "./cart.css"
function Cart(props) {
  const { cardItems, onCheckout } = props
  return (
    <div className="cart_container" >
      <p>Umumiy narx: {totalPrice(cardItems).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })}</p>
      <Button onClick={onCheckout} title={`${cardItems.length == 0 ? "Buyurtma berish " : "Tolov"}`} type="checkout" />
    </div>
  )
}

export default Cart