import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import {Menu} from "./components/Menu";
import {Header} from "./components/Header";
import {Cards} from "./components/Cards";
import {Footer} from "./components/Footer";
import {CardInfo} from "./components/CardInfo";
import React from "react";
import {goods} from "./shopDB";
import {Cart, Tr} from "./components/Cart";

class App extends React.Component{
    constructor() {
        super();
       /* if(window.localStorage.getItem("cart") == null){
            window.localStorage.setItem("cart",[]);
        }
        let cart = window.localStorage.getItem("cart");
        console.log(cart);*/
        this.state = {
            cart: [], //cart,
            cartTr: [], //cart.map((item)=><Tr item={item}/>)
        }
        this.addItemInCart = this.addItemInCart.bind(this);
        this.removeItemInCart = this.removeItemInCart.bind(this);
    }
    componentDidMount() {
        if(window.localStorage.getItem("cart") != null){
            let goodsInCart = JSON.parse(window.localStorage.getItem("cart"));
            this.setState({
                cart: goodsInCart,
                cartTr: goodsInCart.map((item, index)=><Tr removeItemInCart={this.removeItemInCart} index={index} item={item}/>)
            });
        }
    }
    removeItemInCart(index){
        let goodsInCart = this.state.cart;
        goodsInCart.splice(index, 1);
        this.setState({
            cart: goodsInCart,
            cartTr: goodsInCart.map((item, index)=><Tr removeItemInCart={this.removeItemInCart} index={index} item={item}/>)
        });
        window.localStorage.setItem("cart", JSON.stringify(goodsInCart));
        console.log("Удалим товар с индексом ",index)
    }
    addItemInCart(index){
        let product = goods[index];
        product.count = 1;
        let noChangeCount = true;
        let items = this.state.cart.map((item)=>{
            if(item.title == product.title){
                item.count += 1;
                noChangeCount = false;
            }
        });
        let itemTr;
        let goodsInCart;
        if(noChangeCount){ // впервые добавляем товар
            items = this.state.cart.concat(product);
            itemTr= this.state.cartTr.concat(<Tr removeItemInCart={this.removeItemInCart} index={items.length-1} item={product}/>);
            if (window.localStorage.getItem("cart")==null){
                goodsInCart = [];
            }else{
                goodsInCart = JSON.parse(window.localStorage.getItem("cart"))
            }
            goodsInCart.push(goods[index]);
        }else{
            itemTr = items.map((item, index)=><Tr removeItemInCart={this.removeItemInCart} index={index} item={item}/>);
            goodsInCart = items;
        }
        //let goodsInCart = window.localStorage.getItem("cart")==null?[]:JSON.parse(window.localStorage.getItem("cart"));


        window.localStorage.setItem("cart", JSON.stringify(goodsInCart));
        this.setState({
            cart: items,
            cartTr: itemTr
        });

        console.log("Товар добавленв корзину, товары в корзине "+this.state.cart.length);
    }
    render() {
        return (
            <BrowserRouter>
                <Menu cartCount={this.state.cart.length}/>
                <Header/>
                <div className="container px-4 py-5 px-lg-5 mt-5">
                    <Route exact path="/" component={()=><Cards addItemInCart={this.addItemInCart}/>}/>
                    <Route path="/shop" component={()=><CardInfo
                        addItemInCart={this.addItemInCart}
                    />}/>
                    <Route path="/cart" component={()=><Cart goodsTr={this.state.cartTr}/>}/>
                </div>
                <Footer/>
            </BrowserRouter>
        );
    }


}

export default App;
