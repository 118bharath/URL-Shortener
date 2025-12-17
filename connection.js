import mongoose from 'mongoose';
mongoose.set("strictQuery", true);

const dbConnection = async (url) => {
    return mongoose.connect(url);
}

export default dbConnection;