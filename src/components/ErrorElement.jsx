import React from 'react';
import { useRouteError } from 'react-router-dom';
import err from '../assets/not-found/error.jpg';

const ErrorElement = () => {
    const error = useRouteError();
    return (
        <div className="">
            <img src={err} alt={error} />
        </div>
    );
};

export default ErrorElement;
