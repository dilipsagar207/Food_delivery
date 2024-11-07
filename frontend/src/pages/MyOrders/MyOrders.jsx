// import React, { useContext, useEffect, useState } from 'react'
// import './MyOrder.css'
// import { StoreContext } from '../../Context/StoreContext';
// import axios from 'axios';
// import { assets } from '../../assets/assets';
// const MyOrders = () => {

//     const {url,token} =useContext(StoreContext);
//     const [data,setData] = useState([]);

//     const fetchOrders = async() =>{
//         const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
//         setData(response.data.data);
//         console.log(response.data.data);
//     }
//     useEffect(()=>{
//         if(token){
//             fetchOrders();
//         }
//     },[token])

//   return (
//     <div className='my-orders'>
//         <h2>My Orders</h2>
//         <div className="container">
//             {data.map((order,index)=>{
//                 return(
//                 <div key={index} className='my-orders-order'>
//                     <img src={assets.parcel_icon} alt="" />
//                     <p>{order.items.map((item,index)=>{
//                         if(index === order.items.length-1){
//                             return item.name+"x"+item.quantity
//                         }
//                         else{
//                             return item.name+"x"+item.quantity+" , "
//                         }
//                     })}</p>
//                     <p>₹{order.amount}.00</p>
//                     <p>Items:{order.items.length}</p>
//                     <p><span>&#x25cf;</span><b>{order.status}</b></p>
//                     <button onClick={fetchOrders}>Track Order</button>
//                 </div>
//                 )
//             })}
//         </div>
      
//     </div>
//   )
// }

// export default MyOrders

import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MyOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const location = useLocation(); // Get the current location

    const fetchOrders = async () => {
        try {
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    // Check for success message from query params
    const queryParams = new URLSearchParams(location.search);
    const success = queryParams.get('success');

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            {success && (
                <div className="alert">
                    {success === 'true' ? 'Payment Successful!' : 'Payment Failed. Please try again.'}
                </div>
            )}
            <div className="container">
                {data.map((order, index) => (
                    <div key={index} className='my-orders-order'>
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item, index) => (
                            index === order.items.length - 1
                                ? `${item.name} x ${item.quantity}`
                                : `${item.name} x ${item.quantity}, `
                        ))}</p>
                        <p>₹{order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span><b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;
