import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { signout } from "./actions/userActions";
import CartScreen from "./screens/CartScreen";

/* Screens */
import HomeScreen from "./screens/HomeScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductScreen from "./screens/ProductScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SigninScreen from "./screens/SigninScreen";

function App() {
  /**showing notification of the number of items in the cart */
  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);

  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    /**connected to actions and constant */
    dispatch(signout());
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              Bamazon
            </Link>
          </div>
          <div>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <Link to="#signout" onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </div>
        </header>
        <main>
          <Switch>
            <Route path="/product/:id" component={ProductScreen}></Route>
            <Route path="/cart/:id?" component={CartScreen}></Route>
            <Route path="/signin" component={SigninScreen}></Route>
            <Route path="/register" component={RegisterScreen}></Route>
            <Route path="/shipping" component={ShippingAddressScreen}></Route>
            <Route path="/payment" component={PaymentMethodScreen}></Route>
            <Route path="/placeorder" component={PlaceOrderScreen}></Route>
            <Route path="/order/:id" component={OrderScreen}></Route>
            <Route extact path="/" component={HomeScreen}></Route>
          </Switch>
        </main>
        <footer className="row center">All rights reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
