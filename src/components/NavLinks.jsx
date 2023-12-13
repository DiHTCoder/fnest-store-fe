import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import roomServices from '../services/roomServices';
import { useSelector, useDispatch } from 'react-redux';
import { setRoomsList, setSelectedRoom } from '../features/room/roomSilce';
import { FaChevronDown } from 'react-icons/fa';

const NavLinks = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation('translation');

    const links = [
        { id: 1, url: '/', text: t('homepage') },
        { id: 2, url: 'products', text: t('products') },
        { id: 3, url: 'rooms', text: t('rooms') },
        { id: 4, url: 'collections', text: t('collections') },
        { id: 5, url: 'checkout', text: t('purchase_orders') },
        { id: 6, url: 'orders', text: t('purchase_orders') },
        { id: 7, url: 'posts', text: t('creative') },
    ];

    const rooms = useSelector((state) => state.rooms.currentRoom);
    useEffect(() => {
        const getRooms = async () => {
            try {
                const resp = await roomServices.getAllRooms();
                dispatch(setRoomsList(resp.data));
            } catch (error) {}
        };
        getRooms();
    }, []);

    const handleRoomClick = (id) => {
        dispatch(setSelectedRoom(id));
    };

    return (
        <>
            {links.map((link) => {
                const { id, url, text } = link;
                if (url === 'checkout' || url === 'orders' || url === 'cart') return null;
                if (url === 'rooms') {
                    return (
                        <li key={id} className="dropdown dropdown-hover">
                            <label tabIndex={0} className="btn btn-ghost">
                                {text}
                                <FaChevronDown />
                            </label>

                            <ul
                                tabIndex={0}
                                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                            >
                                {rooms ? (
                                    rooms.map((room) => (
                                        <li key={room.id}>
                                            <NavLink to={`/rooms/${room.id}`} onClick={() => handleRoomClick(room.id)}>
                                                {room.name}
                                            </NavLink>
                                        </li>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </ul>
                        </li>
                    );
                }
                return (
                    <li key={id}>
                        <NavLink className="btn btn-ghost" to={url}>
                            {text}
                        </NavLink>
                    </li>
                );
            })}
        </>
    );
};

export default NavLinks;
