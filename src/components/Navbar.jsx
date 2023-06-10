import { AiOutlineShopping } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/StateContext";
import Cart from "./Cart";

function Navbar() {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link to="/"> Sound Store </Link>
      </p>
      <button className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>
      {showCart && <Cart />}
    </div>
  );
}

export default Navbar;
