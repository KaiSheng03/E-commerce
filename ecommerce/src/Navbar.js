import { Fragment, useEffect, useState } from "react";

const Navbar = () => {
    const [budget, setBudget] = useState('');
    const [authenticated, setAuthenticated] = useState();

    useEffect(() => {
        fetch('/home').then(
            res => res.json()
        ).then(
            data => {
                setBudget(data.current_user_budget);
                console.log(data.current_user_budget);
            }    
        ).catch(err => {
            console.log(err)
        })
    },[])

    return (  
        <Fragment>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid">
                    <a className="navbar-brand">E-commerce</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/market">Market</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link">{budget} Welcome</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/logout">Logout</a>
                                </li>
                            </ul>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/register">Register</a>
                                </li>
                            </ul>                            
                    </div>
                </div>
            </nav>
        </Fragment>
    );
}
 
export default Navbar;