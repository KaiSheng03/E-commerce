import { Fragment, useEffect, useState } from "react";
import Market from "./Market";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Navbar from "./Navbar";

const Login = () => {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submitLogin = () => {
        fetch('/login', {
            method: 'POST',
            headers:{
                'Content-Type': 'application.json'
            },
            body: JSON.stringify({username, password})
        }).then(
            res => res.json()
        ).then(
            data => {
                if(data.loginStatus == "Success"){
                    console.log(data.current_user_id)
                    window.location.href = "/market"
                }
            }
        ).catch(err => {
            console.log(err)
        })
    }
    
    return (  
        <Fragment>
            <div className="container">
                <h1>Login</h1>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
                    </div>
                    
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                    </div>
                    <div className="checkbox mb-3">
                        <h6>Do not have an account?</h6>
                        <a href="/register" className="text-light">Register</a>
                    </div>
                    <div className="mb-3">
                        <button type="button" className="btn btn-primary" onClick={submitLogin}>Submit</button>
                    </div>
                </form>
            </div>
        </Fragment>
    );
}
 
export default Login;