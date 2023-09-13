import React from 'react';
import { useSidebarContext } from '../context/sidebar_context';
import logo from '../assets/logo.svg';
import { FaTimes } from 'react-icons/fa';
import {
    FaBehance,
    FaFacebook,
    FaLinkedin,
    FaTwitter,
    FaSketch,
    FaHome,
    FaUserFriends,
    FaFolderOpen,
    FaCalendarAlt,
    FaWpforms,
} from 'react-icons/fa';

export const links = [
    {
        id: 1,
        url: '/',
        text: 'home',
        icon: <FaHome />,
    },
    {
        id: 2,
        url: '/team',
        text: 'team',
        icon: <FaUserFriends />,
    },
    {
        id: 3,
        url: '/projects',
        text: 'projects',
        icon: <FaFolderOpen />,
    },
    {
        id: 4,
        url: '/calendar',
        text: 'calendar',
        icon: <FaCalendarAlt />,
    },
    {
        id: 5,
        url: '/documents',
        text: 'documents',
        icon: <FaWpforms />,
    },
];

const Sidebar = () => {
    const { isSidebarOpen, closeSidebar } = useSidebarContext();

    return (
        <aside
            className={`${
                isSidebarOpen
                    ? 'sidebar show-sidebar overflow-y-scroll'
                    : 'sidebar '
            }`}
        >
            <div className="sidebar-header">
                <img src={logo} className="logo" alt="coding addict" />
                <button className="close-btn" onClick={closeSidebar}>
                    <FaTimes />
                </button>
            </div>
            <ul className="links">
                {links.map((link) => {
                    const { id, url, text, icon } = link;
                    return (
                        <li key={id}>
                            <a href={url}>
                                {icon}
                                {text}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

export default Sidebar;
