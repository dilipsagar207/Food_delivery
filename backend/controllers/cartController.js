// import userModel from "../models/userModel.js"

// //add items to user cart
// const addToCart = async(req,res) =>{
//     try{
//         let userData =await userModel.findById(req.body.userId)
//         let cartData =await userData.cartData;
//         if(!cartData[req.body.itemId])
//         {
//             cartData[req.body.itemId]=1
//         }
//         else{
//             cartData[req.body.itemId] +=1 ;
//         }
//         await userModel.findByIdAndUpdate(req.body.userId,{cartData});
//         res.json({success:true,message:"Added to Cart"});
//     }
//     catch(error){
//         console.log(error);
//         res.json({success:false,message:"error"});
//     }
// }

// //remove items from user cart
// const removeFromCart = async(req,res) =>{
//         try {
//             let userData= await userModel.findById(req.body.userId)
//             let cartData =await userData.cartData;
//             if(cartData[req.body.itemId]>0){
//                 cartData[req.body.itemId]-=1;
//             }
//             await userModel.findByIdAndUpdate(req.body.userId,{cartData});
//             res.json({success:true,message:"Removed from cart"})
//         } catch (error) {
//             console.log(error);
//             res.json({success:false,message:"Error"})
//         }
// }
// //fetch user cart data

// const getCart = async (req,res) =>{
//     try {
//         let userData =await userModel.findById(req.body.userId);
//         let cartData =await userData.cartData;
//         res.json({success:true,cartData})
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"Error"});
//     }

// }

// export default {addToCart,removeFromCart,getCart};   

import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        
        // Ensure userData exists and cartData is initialized
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {}; // Initialize cartData if it doesn't exist

        // Add item to cart
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        // Update user cart
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added to Cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);

        // Ensure userData exists and cartData is initialized
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {}; // Initialize cartData if it doesn't exist

        // Remove item from cart
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;

            // Optional: Remove the item from cart if quantity reaches 0
            if (cartData[req.body.itemId] === 0) {
                delete cartData[req.body.itemId];
            }
        }

        // Update user cart
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Removed from Cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

// Fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);

        // Ensure userData exists
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {}; // Initialize cartData if it doesn't exist
        res.json({ success: true, cartData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

export default { addToCart, removeFromCart, getCart };
