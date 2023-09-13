import React, { useContext, useState } from 'react';

const SidebarContext = React.createContext();

export const useSidebarContext = () => {
    return useContext(SidebarContext);
};

export const SidebarProvider = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const openSidebar = () => {
        setIsSidebarOpen(true);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <SidebarContext.Provider
            value={{ isSidebarOpen, openSidebar, closeSidebar }}
        >
            {children}
        </SidebarContext.Provider>
    );
};
