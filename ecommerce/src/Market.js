import { Fragment, useEffect, useState } from "react";
import ItemsModal from "./ItemsModal";

const Market = () => {
    const [item, setData] = useState([]);
    useEffect(() => {
        fetch('/market/items/').then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                console.log(data)
            }
        ).catch(err => {
            console.log(err)
        })
    }, [])
    
    const [ownedItem, setOwnedItem] = useState([]);
    useEffect(() => {
        fetch('/market/owned/').then(
            res => res.json()
        ).then(
            item => {
                setOwnedItem(item)
            }
        ).catch(err => {
            console.log(err)
        })
    }, [])

    const purchaseItem = (item_id) => {
        fetch('/market/purchase', {
            method: 'POST',
            headers: {
                "Content-Type": "application.json"
            },
            body: JSON.stringify({item_id})
        }).then(
            res => res.json()
        ).then(
            data => {
                console.log(data.message)
            }
        ).then(
            window.location.href = "/market"
        )
    }

    const sellItem = (item_id) => {
        fetch('/market/sell', {
            method: 'POST',
            headers: {
                "Content-Type": "application.json"
            },
            body: JSON.stringify({item_id})
        }).then(
            res => res.json()
        ).then(
            data => {
                console.log(data.message)
            }
        ).then(
            window.location.href = "/market"
        )
    }

    return (  
        <Fragment>
            <div className="row" style={{ marginTop: "20px", marginLeft: "20px" }}>
                <div className="col-8">
                    <h2>Available items on the market</h2>
                    <p>Click on one of the items to start buying</p>
                    <br />
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
                            {item.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.barcode}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <button
                                            className="btn btn-outline btn-info"
                                            data-bs-toggle="modal"
                                            data-bs-target={`#modalMoreInfo-${item.id}`}
                                        >
                                            More Info
                                        </button>

                                        {/* More Info Modal */}
                                        <div className="modal fade" id={`modalMoreInfo-${item.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content" style={{ backgroundColor: "#212121" }}>
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id="exampleModalLabel">{item.name}</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        {item.description}
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            className="btn btn-outline btn-success"
                                            data-bs-toggle="modal"
                                            data-bs-target={`#modalPurchaseConfirm-${item.id}`}
                                        >
                                            Purchase this Item
                                        </button>

                                        {/* Purchase Confirmation Modal */}
                                        <div className="modal fade" id={`modalPurchaseConfirm-${item.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content" style={{ backgroundColor: "#212121" }}>
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id="exampleModalLabel">{item.name}</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <form>
                                                            <h4>
                                                                Are you sure you want to buy {item.name} for {item.price}$
                                                            </h4>
                                                            <h6>
                                                                By clicking 'Purchase', you will purchase the item
                                                            </h6>
                                                            <button type="button" className="btn btn-primary" onClick={() => purchaseItem(item.id)}>Purchase</button>
                                                        </form>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-4">
                    <h2>Owned Items</h2>
                    <p>Click on the item to put an item back on the market</p>
                    <br />
                    <div className="row">
                        <div className="col-md-6">
                            {ownedItem.map((ownedItem) => (
                                <div className="card text-center bg-dark" key={ownedItem.id}>
                                    <div className="card-body">
                                        <h5 className="card-title" style={{ color: "white" }}>
                                            {ownedItem.name}
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger"
                                            data-bs-toggle="modal"
                                            data-bs-target={`#modalSellingConfirm-${ownedItem.id}`}
                                        >
                                        <div className="modal fade" id={`modalSellingConfirm-${ownedItem.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content" style={{backgroundColor: "#212121"}}>
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id="exampleModalLabel">{ownedItem.name}</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <form>
                                                            <h4>
                                                                Are you sure you want to sell {ownedItem.name} for {ownedItem.price}$
                                                            </h4>
                                                            <h6>
                                                                By clicking 'Sell', you will sell the item.
                                                            </h6>
                                                            <button type="button" className="btn btn-primary" onClick={() => sellItem(ownedItem.id)}>Sell</button>
                                                        </form>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                            Sell This Item
                                        </button>
                                        <p className="card-text" style={{ color: "white" }}>
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
