import React, { useState } from 'react';
import { Banner, RoomsContainer, Loading } from '../components';
import roomServices from '../services/roomServices';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

const Rooms = () => {
    const selectedRoom = useSelector((state) => state.rooms.selectedRoom);
    const [room, setRoom] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchRoomById = async () => {
            setIsLoading(true);
            try {
                const response = await roomServices.getRoomById(selectedRoom);
                setRoom(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching room:', error);
                setIsLoading(false);
            }
        };
        fetchRoomById();
    }, [selectedRoom]);
    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <Banner name={room.name} url="rooms" image={room.image} />
                    <RoomsContainer roomId={selectedRoom} />
                </>
            )}
        </>
    );
};

export default Rooms;
