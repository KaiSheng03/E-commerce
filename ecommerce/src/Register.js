import { Fragment, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Register = () => {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const submitRegister = () => {
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application.json'
            },
            body: JSON.stringify({username, email, password, confirmPassword})
        }).then(
            res => res.json()
        ).then(
            data => {
                if(data.registerStatus == "Success"){
                    history.push('/market')
                }
            }
        ).catch(err => {
            console.log(err)
        })
    }

    return (  
        <Fragment>
            <div className="container">
                <h1>Register Form</h1>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input type="text" name="username" className="form-control" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" name="email" className="form-control" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input type="password" name="confirmPassword" className="form-control" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}}/>
                    </div>
                    <div className="checkbox mb-3">
                        <h6>Already have an account?</h6>
                        <a href="/login" className="text-light">Login</a>
                    </div>
                    <div className="mb-3">
                        <button type="button" className="btn btn-primary" onClick={submitRegister}>Register</button>
                    </div>
                </form>
            </div>
        </Fragment>
    );
}
 
export default Register;