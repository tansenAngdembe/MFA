import mongoose from "mongoose";


export async function connect(uri) {
    return mongoose.connect(uri)
}

