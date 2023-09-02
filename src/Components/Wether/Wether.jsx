import React, { useState } from 'react'
import './Wether.css'
function Wether() {
   const [serch,SetSearch]=useState('New york')
   const Searching=(e)=>{
    SetSearch(e.target.value)
   }
   const GetWether=()=>{
    console.log('start');
    let URL=`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WETHER_API}&query=${serch}`
        fetch(URL)
        .then((responce)=>responce.json()).then((data)=>{
            console.log(data);
        }).catch((err)=>{
           
        })
   }
   
  return (
    <>
    <div className='Wether-mail'>
      <div className='OuterDiv'>
      <div className='SearchBar'>
        <input 
        type='text' 
        onChange={(e)=>Searching(e)}   
        value={serch} />
        <button type='button' onClick={GetWether}>Search</button>
      </div>
      </div>
      </div> 
    </>
  )
}
 
export default Wether
