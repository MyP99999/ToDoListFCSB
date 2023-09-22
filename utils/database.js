import mongoose from "mongoose"

const connectDB = async () => {
    if(mongoose.connections[0].readyState) {
        return true
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to the MongoDB')
    } catch (err) {
        console.log(err)
    }
}

export default connectDB;