import React, { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext();

const SOCKET_SERVER_URL = 'http://your-server-url:3000/'; // Replace with your server URL

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Initialize socket connection
        const socketIo = io(SOCKET_SERVER_URL);
        setSocket(socketIo);

        // Cleanup on dismount
        return () => {
            socketIo.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};