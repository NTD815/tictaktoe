class ConnectionStore{

    static instance = null;
    constructor(){
        this.connections = new Map();
    }

    static getInstance(){
        if(!ConnectionStore.instance){
            ConnectionStore.instance = new ConnectionStore();
        }

        return ConnectionStore.instance;
    }

    setConnection(userId, connectionData){
        this.connections.set(userId, connectionData);
    }

    getConnection(userId){
        return this.connections.get(userId);
    }

    removeConnection(userId){
        this.connections.delete(userId);
    }
}

export const connectionStore = ConnectionStore.getInstance;