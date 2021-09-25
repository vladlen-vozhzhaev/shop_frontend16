import React from 'react';
import {goods} from "../shopDB";

export class CardInfo extends React.Component{
    constructor() {
        super();
        this.state = {
            title: "",
            price: "",
            img: "",
            description: "",
        }
        this.handlerAddInCart = this.handlerAddInCart.bind(this);
    }
    componentDidMount() {
        const index = window.location.pathname.split("/")[2];
        const item = goods[index];
        this.setState({
            title: item.title,
            price: item.price,
            img: item.img,
            description: item.description,
        })
    }
    handlerAddInCart(){
        const index = window.location.pathname.split("/")[2];
        this.props.addItemInCart(index);
    }
    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
                <div className="row">
                    <div className="col-sm-4 text-center">
                        <img width="100%" src={this.state.img} alt=""/>
                        <button className="btn btn-lg btn-info" onClick={this.handlerAddInCart}>Добавить в корзину</button>
                    </div>
                    <div className="col-sm-8">
                        <h3>Описане товара</h3>
                        <p>Цена: {this.state.price}</p>
                        <p>
                            {this.state.description}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
