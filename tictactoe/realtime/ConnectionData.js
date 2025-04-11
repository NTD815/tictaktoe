export default class ConnectionData{
    constructor(userData, connectionObject){
        this.userData = userData;
        this.connectionObject = connectionObject;
        this.connectedAt = Date.now();
        this.lastActiveAt = Date.now();
    }

    updateLastActive(){
        this.lastActiveAt = Date.now();
    }

    isActive(){
        return Date.now() - this.lastActiveAt < 300000;
    }
}