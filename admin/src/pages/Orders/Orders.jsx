import React, { useState } from 'react'
import './Orders.css'
import {toast} from 'react-toastify'
import { useEffect } from 'react'
import axios from 'axios'
import {assets} from "../../assets/assets"

const Orders = ({url}) => {

  const [orders,setOrders] = useState([]);

  // const fetchAllOrders =async()=>{
  //   const response = await axios.get(url+"/api/order/list");
  //   if(response.data.success){
  //     setOrders(response.data.data);
  //     console.log(response.data.data);
  //   }
  //   else{
  //     toast.error("Error")
  //   }
  // }

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      if (error.response) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        toast.error("Network Error");
      }
    }
  }

  const statusHandler = async (event,orderId)=>{
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })
    if(response.data.success)
    {
      await fetchAllOrders();
    }
  }

  useEffect(()=>{
    fetchAllOrders();
  },[])

  return (
    <div className='order add'>
    <h3>Order Page</h3>
    <div className="order-list">
      {orders.map((orders,index)=>(
        <div key={index} className='order-item'>
          <img src={assets.parcel_icon} alt="" />
          <div>
            <p className='order-item-food'>
              {orders.items.map((item,index)=>{
                if(index===orders.items.length-1){
                  return item.name + " x " +item.quantity
                }
                else{
                  return item.name + " x " +item.quantity + " , "
                }

              })}
            </p>
            <p className="order-item-name">{orders.address.firstName+" "+orders.address.lastName}</p>
            <div className="order-item-address">
              <p>{orders.address.street+","}</p>
              <p>{orders.address.city+", " +orders.address.state+", "+orders.address.country+", "+orders.address.zipcode}</p>
            </div>
            <p className='order-item-phone'>{orders.address.phone}</p>
          </div>
          <p>Items:{orders.items.length}</p>
          <p>₹{orders.amount}</p>
          <select onChange={(event)=>statusHandler(event,orders._id)} value={orders.status}>
            <option value="Food Processing">Food Processing</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      

     ))}
    </div>
    
  </div>
  )
}

export default Orders
