import { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Logout = () => {
    const [username, setUsername] = useState("");

    useEffect(() => {
        fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application.json'
            },
        }).then(
            res => res.json()
        ).then(
            data => {
                setUsername(data.name);
            }
        )
    
    }, [])
    
    return (
        <div className="container">
            <h1>You have successfully logged out as {username}</h1>
        </div>  
    );
}
 
export default Logout;