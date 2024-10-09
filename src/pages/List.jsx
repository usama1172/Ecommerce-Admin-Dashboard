import React, { useState, useEffect } from 'react'
import { backend_url, currency } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'


const List = ({token}) => {
  
  const [list, setList] = useState([])
  const fetchData = async () =>{
    try {
      const response = await axios.get(backend_url + '/api/products/list', {headers: {token}})
      if(response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error)
      toast.error('An error occurred while trying to fetch data. Please try again.');
      
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backend_url + '/api/products/remove' , {id}, {headers: {token}})
      if(response.data.success) {
        toast.success('Product removed successfully');
        await fetchData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error)
      toast.error('An error occurred while trying to remove product. Please try again.');
      
    }
  }



  useEffect(()=>{
    fetchData()
  },[])


  return (
    <>
    <p className='mb-2'>All Product List</p>
    <div className='flex flex-col gap-2'>
      {/* List table title */}
      <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 bg-gray-100 border text-sm'>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className='text-center'>Action</b>        
      </div>
      {/* Product List */}
      {
        list.map((product, index) => (
          <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border'>
            <img className='w-10 h-10' src={product.image[0]} alt={product.name} />
            <p>{product.name}</p>
            <p>{product.category}</p>
            <p>{currency}{product.price}</p>
            <div className='text-center'>
              <button onClick={()=>removeProduct(product._id)} className='text-right md:text-center cursor-pointer text-lg'>X</button>
            </div>
          </div>
        ))
      }
    </div>
    </>
  )
}

export default List
