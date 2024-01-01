import React from 'react';
import { NavLink } from 'react-router-dom';

const Error = () => {
    return (
        <div className='container d-flex flex-column min-vh-100 align-items-center justify-content-center'>
            <div className='row'>
                <div className='col-md-12 col-lg-12 text-center'>
                    <h1>404 Error!</h1>
                    <NavLink className="btn btn-dark" to={"/"}>{`<< `}Go Back</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Error;
