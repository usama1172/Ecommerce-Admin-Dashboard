import React, { useState, useEffect } from 'react'
import {toast} from 'react-toastify'
import {backend_url, currency} from '../App'
import axios from 'axios'
import { assets } from '../assets/assets'
const Orders = ({token}) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () =>{
    if ( !token ) {
      toast.error("Token is required to access this page.")
      return
    }
    try {
      const response = await axios.post(backend_url + '/api/orders/all', {}, {headers:{token}})
      console.log(response.data)
      if (response.data.success) {
        setOrders(response.data.order);
      }
      else{
        toast.error(response.data.message)
      }

      
    } catch (error) {
      console.error(error)
      toast.error('An error occurred while trying to fetch data. Please try again.')
    }

  }

  const handleOrderStatusChange = async (event,orderId) => {
    try {
      const response = await axios.post(backend_url + '/api/orders/update', {orderId, status: event.target.value}, {headers:{token}})
      if (response.data.success) {
        toast.success('Order status updated successfully.')
        fetchAllOrders()
      }
      else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.error(error)
      toast.error('An error occurred while trying to update order status. Please try again.')
      
    }

  }


  useEffect(() => {
    fetchAllOrders()
  }, [token])
  return (
    <div>
      <h3>Orders Page</h3>
      <div>
        {
          orders.map((order, index) => (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs md:text-sm text-gray-700 ' key={index}>
              <img className='w-12' src={assets.parcel_icon}/>
              <div>
              <div>
                {
                 order.items.map((item, index) =>{
                  if (index === order.items.length - 1) {
                    return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>
                  }
                  else{
                    return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size}</span>,</p>

                  }
                 }) 
                }
              </div>
              <p className='mt-3 mb-2 font-medium'>{order.address.firstname + " " + order.address.lastname}</p>
              <div>
              <p>{order.address.street + ", "}</p>
              <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
              <p>{order.address.phone}</p>
              </div>
              <div>
                <p className='text-sm sm:text-[15px]'>Items: {order.items.length}</p>
                <p className='mt-3'>Mthod: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? "Done" : "Pending"} </p>
                <p>Date: {new Date(order.date).toLocaleDateString()} </p>
              </div>
              <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
              <select onChange={(event)=>handleOrderStatusChange(event, order._id)} value={order.status} className='p-2 font-semibold'>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipping">Shipping</option>
                <option value="Out of delivery">Out of delivery</option>
                <option value="Delivered">Delivered</option> 
              </select>
            </div>
          ))

        }
      </div>
    </div>
  )
}

export default Orders
