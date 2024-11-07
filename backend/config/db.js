import mongoose from "mongoose";

export const connectDB =async ()=>{
    await mongoose.connect('mongodb+srv://dilipsagar2072003:46252@cluster0.yxz3g.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}