import { Fragment, useEffect, useState } from "react";

const Market = () => {
    const [item, setData] = useState([]);
    useEffect(() => {
        fetch('/market/items').then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                console.log(data)
            }
        )
    }, [])
    
    const [ownedItem, setOwnedItem] = useState([]);
    useEffect(() => {
        fetch('/market/owned').then(
            res => res.json()
        ).then(
            item => {
                setOwnedItem(item)
                console.log(item)
            }
        )
    }, [])

    return (  
        <Fragment>
            <div className="row" style={{marginTop: "20px", marginLeft: "20px"}}>
                <div className="col-8">
                    <h2>Available items on the market</h2>
                    <p>Click on one of the items to start buying</p>
                    <br/>
                    <table className="table table-hover table-dark">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Barcode</th>
                                <th scope="col">Price</th>
                                <th scope="col">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {item.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.barcode}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <button className="btn btn-outline btn-info" data-bs-toggle="modal" data-bs-target={`#modalMoreInfo-${item.id}`}>
                                            More Info
                                        </button>
                                        <button className="btn btn-outline btn-success" data-bs-toggle="modal" data-bs-target={`#modalPurchaseConfirm-${item.id}`}>
                                            Purchase this Item
                                        </button>  
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> 
                <div className="col-4">
                    <h2>Owned Items</h2>
                    <p>Click on the item to put an item back on market</p>
                    <br/>
                    <div className="row">
                        <div className="col-md-6">
                            {ownedItem.map(ownedItem => (
                                <div className="card text-center bg-dark">
                                <div className="card-body">
                                    <h5 className="card-title" style={{color:"white"}}>{ownedItem.name}</h5>
                                        <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#modalSellingConfirm-{{owned_item.id}}">
                                            Sell This Item
                                        </button>
                                    <p class="card-text" style={{color: "white"}}>
                                        This item costs {ownedItem.price}
                                    </p>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
 
export default Market;
