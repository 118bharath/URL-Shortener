const sessionIdToUsermap=new Map();

const setUser=(id,user)=>{
    sessionIdToUsermap.set(id,user);
}

const getUser=(id)=>{
    return sessionIdToUsermap.get(id);
}

export default{
    setUser,
    getUser,
}