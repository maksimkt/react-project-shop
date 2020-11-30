import React from "react"
import Products from "./components/Poducts"
import data from "./product.json"
import Filter  from "./components/Filter";
import Cart from "./components/Cart";
import store from "./store"
import { Provider } from "react-redux";

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      products: data.products,
      produser:"",
      sort:"",
      cartItems:localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")): [],
    };
  }

  createOrder = (order) => {
    let info = order.firstName + " " +  order.lastName + "?"
    alert("Save order " + info);
    
  };

  removeFromCart = (product) =>{
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter(x=>x._id !==product._id),
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter(x=>x._id !==product._id))
    );
 };


  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach(item =>{
      if(item._id === product._id) {
        item.count ++;
        alreadyInCart = true;
      }
    });
    if(!alreadyInCart){
      cartItems.push({...product, count: 1});
    }
    this.setState({cartItems});
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  // sortProducts = (event) =>{
  //   const sort = event.target.value;
  //   this.setState((state) =>({
  //     sort:sort,
  //     products: this.state.products
  //     .slice()
  //     .sort((a,b) =>
  //       sort === "lowest"
  //         ? a.price > b.price
  //           ? 1
  //           :-1
  //         : sort === "highest"
  //           ? a.price < b.price
  //             ? 1
  //             :-1
  //         : a._id > b._id
  //         ? 1
  //         :-1
  //     ), 
  //   }));
  // }
  // filterProducts = (event) => {
  //   this.setState({
  //     produser:event.target.value,
  //     products:data.products.filter(
  //       (product) => product.creator.indexOf(event.target.value)>=0
  //       ),
  //   });
  // };

  render() {
    return (
      <Provider store={store}>
      <div className="app-conatiner">
        <header className="">
          <a href="/">Project shop</a>
        </header>
        <main className="">
          <div className="content">
            <div className="main">
              
              <Filter></Filter>
              <Products
              addToCart={this.addToCart}
              ></Products>
            </div>
            <div className="sidebar">
              <Cart cartItems = {this.state.cartItems}
              removeFromCart={this.removeFromCart}
              createOrder={this.createOrder}/>
            </div>
          </div>
        </main>
        <footer className="">test</footer>
      </div>
      </Provider>
    );
  }

}

export default App;
