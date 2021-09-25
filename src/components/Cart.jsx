export function Tr(props){
    return (
        <tr>
            <th scope="row">1</th>
            <td><img width="100" src={props.item.img}/></td>
            <td>{props.item.title}</td>
            <td>1</td>
            <td><button className="btn btn-danger" onClick={()=>{props.removeItemInCart(props.index)}}>Удалить</button></td>
        </tr>
    )
}

export function Cart(props){
    return (
        <div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Изображение</th>
                    <th scope="col">Название</th>
                    <th scope="col">Кол-во</th>
                    <th scope="col">-</th>
                </tr>
                </thead>
                <tbody>
                    {props.goodsTr}
                </tbody>
            </table>
        </div>
    )
}
