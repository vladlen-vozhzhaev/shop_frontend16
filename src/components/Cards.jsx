import React from "react";
import {Card} from "./Card";
import {goods} from "../shopDB";

export class Cards extends React.Component{
    constructor(props) {
        super();
        this.state = {
            cards: []
        }
    }

    componentDidMount() {
        this.setState({
            cards: goods.map((item,index)=><Card
                key={index}
                title={item.title}
                price={item.price}
                img={item.img}
                index={index}
                addItemInCart={this.props.addItemInCart}
            />)
        })
    }

    render() {
        return (
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                {this.state.cards}
            </div>
        )
    }
}
