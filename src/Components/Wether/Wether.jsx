import React, { useState } from 'react'
import './Wether.css'
import Sunny from '../../Assets/cloud.png'
import Humudity from '../../Assets/humidity.png'
import wind from '../../Assets/wind.png'
function Wether() {
  const[data,setData]=useState({})
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
            setData(data)
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
      <div className='wetherImage'>
      <img src={Sunny} alt="" />
        </div>
      <div className='wetherPlace'>
          <div className='celsious'>45°C</div>
          <br/>
          <h3>New york</h3>
        </div> 
        <div className='footer'>
        <div className='humudity'>
          <img src={Humudity} alt="" />
          64% <br/> Humudity
        </div>
        <div className='wind'>
      <img src={wind} alt="" />
      18 km/h <br/> wind speed
        </div>
        </div>
      </div>
      </div> 
    </>
  )
}
 
export default Wether
