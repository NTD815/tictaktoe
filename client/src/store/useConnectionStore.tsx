import { create } from 'zustand';
import socket from "@/lib/socket";

interface ConnectionState {
    connectionEstablished: boolean;
    isAuthenticated: boolean;
    totalActiveUsers: number;
    registerSync: () => () => void;
    connect: () => void;
    disconnect: () => void;
    upgradeToPresenceChannel: (userId: string | undefined) => void;
    leavePresenceChannel: (userId: string | undefined) => void;
}

const useConnectionStore = create<ConnectionState>((set, get) => ({
    connectionEstablished: socket.connected,
    isAuthenticated: false,
    totalActiveUsers: 0,
    registerSync: () => {
        const cSync = () => {
            set({ connectionEstablished: true });
        }
        const dSync = () => {
            set({ connectionEstablished: false });
        }

        socket.on("connect", cSync);
        socket.on("disconnect", dSync);

        return () => {
            socket.off("connect", cSync);
            socket.off("disconnect", dSync);
        }
    },
    connect: () => {
        if(!socket.connected) socket.connect();
    },
    disconnect: () => {
        if(socket.connected) socket.disconnect();
    },
    upgradeToPresenceChannel: (userId) => {
        if(!userId) return;

        if (socket.connected) {
            socket.emit("authenticate", { userId });
        } else {
            socket.once("connect", () => {
                socket.emit("authenticate", { userId });
            });
        }

        set({ isAuthenticated: true });
    },
    leavePresenceChannel: (userId) => {
        if(!userId) return;

        if (socket.connected) {
            socket.emit("leave_presence_channel", { userId });
        }

        set({ isAuthenticated: false });
    },
}));

export default useConnectionStore;