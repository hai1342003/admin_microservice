import React, { useEffect } from 'react'
import { backendUrl, currency } from '../App';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({token}) => {

  const [orders, setOrders] = useState([])
  const fetchAllOrders = async () => {
    
    if (!token) {
      return null;
    }
    
    

    try {
      

      
      
      const response = await axios.post(backendUrl + '/api/orders/list', {}, {headers:{token}})
      console.log(response.data)

      if(response.data.success) {


        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {

        toast.error(error.message);


    }
  }






  const statusHandler = async (event,orderId) => {
    try {
      console.log('orderId:', orderId); // Kiểm tra orderId
      console.log('status:', event.target.value); // Kiểm tra status

      const response = await axios.post(backendUrl + '/api/orders/status', {orderId, status:event.target.value}, {headers:{token}})
      if (response.data.success) {


        await fetchAllOrders()
      }
    } catch (error) {
        console.log(error);
        
        toast.error(error.response?.data?.message || error.message);
    }
  }

  useEffect(() => {
    fetchAllOrders();

  },[token])
  return (
    <div>
        <h3>Order Page</h3>
        <div>
          {
            orders.map((order,index) => (

              <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
                <img className='w-12' src={assets.parcel_icon} alt="" />
                <div>
                  <div>
                    {order.items.map((item,index)=>{
                      if (index === order.items.length - 1) {
                        return <p className='py-0.5' key={index}> {item.name} x {item.quantity} <span> {item.ram}</span></p>
                      } else {
                        return <p className='py-0.5' key={index}> {item.name} x {item.quantity} <span> {item.ram}</span>,</p>
                      }
                    })}
                  </div>
                  <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
                  <div>
                    <p>{order.address.street + ","}</p>
                    <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipCode}</p>
                  </div>
                  <p>{order.address.phone}</p>
                </div>
                <div>
                  <p className='text-sm sm:text-[15px]'>Items: {order.items.length}</p>
                  <p className='mt-3'>Methods: {order.paymentMethod}</p>
                  <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                  <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
                <select onChange={(event)=>statusHandler(event,order.id)} value={order.status}>
                  <option value="ORDER_PLACED">ORDER_PLACED</option>
                  <option value="PENDING">PENDING</option>
                  <option value="CONFIRMED">CONFIRMED</option>
                  <option value="SHIPPED">SHIPPED</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default Orders




