import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

/* Screens */
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <a className="brand" href="/">
              Solar
            </a>
          </div>
          <div>
            <a href="/cart">Cart</a>
            <a href="/signin">Sign In</a>
          </div>
        </header>
        <main>
          <Switch>
            <Route path="/product/:id" component={ProductScreen} />
            <Route extact path="/" component={HomeScreen} />
          </Switch>
        </main>
        <footer className="row center">All rights reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
