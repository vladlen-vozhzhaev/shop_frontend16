import React from "react";
import {Link} from "react-router-dom";

export function Card(props){
    return (
        <div className="col mb-5">
            <div className="card h-100">

                <img className="card-img-top" src={props.img} alt="..."/>
                <div className="card-body p-4">
                    <div className="text-center">

                        <h5 className="fw-bolder">{props.title}</h5>

                        {props.price}
                    </div>
                </div>

                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center">
                        <Link className="btn btn-outline-dark mt-auto" to={"/shop/"+props.index}>Подробнее</Link>
                        <button className="btn btn-primary" onClick={()=>{props.addItemInCart(props.index)}}>Добавить в корзину</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
