import React from 'react';
import { useState, useEffect } from 'react';
import { SingleStylist } from '../components';
const url = 'https://course-api.com/react-tours-project';

const Stylist = () => {
    const [tours, setTours] = useState([]);
    const fetchTours = async () => {
        try {
            const response = await fetch(url);
            const tours = await response.json();
            setTours(tours);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchTours();
    }, []);
    return (
        <section>
            <div className="px-[20px] gap-2 grid grid-cols-3 mt-10">
                {tours.map((tour) => {
                    return <SingleStylist key={tour.id} {...tour} />;
                })}
            </div>
        </section>
    );
};

export default Stylist;
