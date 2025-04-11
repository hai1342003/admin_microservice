import React from 'react'
import {assets} from '../assets/assets'
import { useState } from 'react'

import axios from 'axios'
import { backendUrl } from '../App'

import { ToastContainer, toast } from 'react-toastify'

const Add = () => {

  const [image1, setImage1] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Asus')
  const [price, setPrice] = useState('')

  
  
  
  const [ram, setRam] = useState([])


  const [bestseller, setBestseller] = useState(false)


  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData()
    
      formData.append('name', name)


      formData.append('description', description)


      formData.append('category', category)
      formData.append('price', price)

      formData.append('ram', ram.join(',')) // → "8GB,16GB"
      formData.append('bestseller', bestseller.toString())


      image1 && formData.append('image1', image1)




      const response = await axios.post(backendUrl + '/api/products', formData)


      if (response.data.success) {
        toast.success(response.data.message)

        setName('')
        setDescription('')
        setImage1('')
        
        setPrice('')
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }


  return (
    <div>
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
          <div>
            <p className='mb-2'>Upload Image</p>

            <div className='flex gap-2'>
              <label htmlFor="image1">
                
                <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden />
              </label>
              {/* <label htmlFor="image2">
                
                <img className='w-20' src={assets.upload_area} alt="" />
                <input type="file" id="image2" hidden />
              </label>

              <label htmlFor="image3">
                
                <img className='w-20' src={assets.upload_area} alt="" />
                <input type="file" id="image3" hidden />
              </label>
              <label htmlFor="image4">
                
                <img className='w-20' src={assets.upload_area} alt="" />
                <input type="file" id="image4" hidden />
              </label> */}
            </div>
          </div>
          

          <div className='w-full'>
            <p className='mb-2'>Product name</p>


            <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required/>
          </div>


          <div className='w-full'>
            <p className='mb-2'>Product description</p>


            <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required/>
          </div>

          <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
            
            <div>
              <p className='mb-2'>Product Category</p>
              <select onChange={(e)=>setCategory(e.target.value)} value={category} className='w-full max-w-[150px] px-3 py-2' name="" id="">
                <option value="Asus">Asus</option>
                <option value="Acer">Acer</option>
                <option value="MSI">MSI</option>
              </select>
            </div>

            <div>
              <p className='mb-2'>Product Price</p>
              <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='23'/>
            </div>

          </div>
          <div>
            <p className='mb-2'>Product Ram</p>
            <div className='flex gap-3'>
              <div onClick={()=>setRam(prev => prev.includes('8GB') ? prev.filter(item => item !== '8GB') : [...prev, '8GB'])}>
                <p className={`${ram.includes('8GB') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>8GB</p>
              </div>
              <div onClick={()=>setRam(prev => prev.includes('16GB') ? prev.filter(item => item !== '16GB') : [...prev, '16GB'])}>
                <p className={`${ram.includes('16GB') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>16GB</p>
              </div>
              <div onClick={()=>setRam(prev => prev.includes('32GB') ? prev.filter(item => item !== '32GB') : [...prev, '32GB'])}>
                <p className={`${ram.includes('32GB') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>32GB</p>
              </div>
            </div>
          </div>

          <div className='flex gap-2 mt-2'>
            <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
            <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
          </div>

          <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
        </form>
        
    </div>
  )
}
export default Add