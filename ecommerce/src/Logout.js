import { useEffect, useState } from "react";

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
        ).then(
            setTimeout(() => {
                window.location.href = '/';
            }, 5000)
        )
        .catch(err => {
            console.log(err)
        })
    }, [])
    
    return (
        <div className="container">
            <h1>You have successfully logged out as {username}</h1>
        </div>  
    );
}
 
export default Logout;