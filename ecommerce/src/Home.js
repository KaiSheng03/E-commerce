import { Fragment } from "react";

const Home = () => {
    return (  
        <Fragment>
            <div className="position-relative overflow-hidden p-3 text-center bg-dark" style={{color: 'white'}}>
                <div className="col-md-5 p-lg-5 mx-auto my-5">
                    <h1 className="display-4 font-weight-normal">Market</h1>
                    <a className="btn btn-primary" href="/market">Get Started</a>
                </div>
            </div>
        </Fragment>
    );
}
 
export default Home;