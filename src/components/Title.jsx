import React from 'react';

const Tittle = ({ text }) => {
    return (
        <>
            <h2 className="lg:text-2xl text-lg font-bold pt-6 pb-4">{text}</h2>
            <div className="w-[100px] h-[3px] bg-primary"></div>
        </>
    );
};

export default Tittle;
