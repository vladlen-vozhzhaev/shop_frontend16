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
        this.changeCount = this.changeCount.bind(this);
    }
    componentDidMount() {
        if(window.localStorage.getItem("cart") != null){
            let goodsInCart = JSON.parse(window.localStorage.getItem("cart"));
            this.setState({
                cart: goodsInCart,
                cartTr: goodsInCart.map((item, index)=><Tr key={index} changeCount={this.changeCount} removeItemInCart={this.removeItemInCart} index={index} item={item}/>)
            });
        }
    }
    removeItemInCart(index){
        let goodsInCart = this.state.cart;
        goodsInCart.splice(index, 1);
        this.setState({
            cart: goodsInCart,
            cartTr: goodsInCart.map((item, index)=><Tr key={index} changeCount={this.changeCount} removeItemInCart={this.removeItemInCart} index={index} item={item}/>)
        });
        window.localStorage.setItem("cart", JSON.stringify(goodsInCart));
        console.log("Удалим товар с индексом ",index)
    }
    addItemInCart(index){
        console.log(this.state.cart);
        let product = goods[index];
        product.count = 1;
        let noChangeCount = true;
        let items = this.state.cart.map((item)=>{
            let itemObj = {};
            Object.assign(itemObj, item);
            if(item.title == product.title){
                console.log(item);
                itemObj.count += 1;
                noChangeCount = false;
            }
            return itemObj;
        });
        let itemTr;
        let goodsInCart;
        console.log(noChangeCount);
        if(noChangeCount){ // впервые добавляем товар
            items = this.state.cart.concat(product);
            itemTr= this.state.cartTr.concat(<Tr key={index} changeCount={this.changeCount} removeItemInCart={this.removeItemInCart} index={items.length-1} item={product}/>);
            if (window.localStorage.getItem("cart")==null){
                goodsInCart = [];
            }else{
                goodsInCart = JSON.parse(window.localStorage.getItem("cart"))
            }
            goodsInCart.push(goods[index]);
        }else{
            itemTr = items.map((item, index)=><Tr key={index} changeCount={this.changeCount} removeItemInCart={this.removeItemInCart} index={index} item={item}/>);
            goodsInCart = items;
        }
        //let goodsInCart = window.localStorage.getItem("cart")==null?[]:JSON.parse(window.localStorage.getItem("cart"));
        window.localStorage.setItem("cart", JSON.stringify(goodsInCart));
        this.setState({
            cart: items,
            cartTr: itemTr
        });

        //console.log("Товар добавленв корзину, товары в корзине "+this.state.cart);
    }
    changeCount(index, operator){
        let goodsInCart = JSON.parse(window.localStorage.getItem("cart"));
        let product = goods[index];
        let changeState = true;
        let newGoodsInCart = goodsInCart.map((item)=>{
            let newItem = {};
            Object.assign(newItem, item);
            if(item.title == product.title){
                if(operator == "+"){
                    newItem.count += 1;
                }else{
                    newItem.count -= 1;
                    console.log(newItem.count == 0);
                    if(newItem.count == 0){
                        changeState = false;
                        this.removeItemInCart(index);
                    }
                }
            }
            return newItem;
        });
        if (changeState){
            window.localStorage.setItem("cart", JSON.stringify(newGoodsInCart));
            this.setState({
                cart: newGoodsInCart,
                cartTr: newGoodsInCart.map((item, index)=><Tr key={index} changeCount={this.changeCount} removeItemInCart={this.removeItemInCart} index={index} item={item}/>)
            });
        }
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
