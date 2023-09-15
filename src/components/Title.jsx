import React from 'react';

const Tittle = ({ text }) => {
    return (
        <>
            <h2 className="text-2xl font-bold pt-10 pb-4">{text}</h2>
            <div className="w-[100px] h-[3px] bg-primary"></div>
        </>
    );
};

export default Tittle;
