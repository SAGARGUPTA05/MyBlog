import React, { useEffect, useState } from 'react'
import axios from 'axios'
const API_key='046943e22bf84e8f9d48f513b32db74e'

function Weather() {
  const [data,setData]=useState({})
  const [loaction,setLocation]=useState("")
  useEffect(()=>{
    const fetchDefaultLocation=async()=>{
      const defaultLocation="Faridabad"
       const url=`https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&appid=${API_key}`
       const response=await axios.get(url)
       setData(response.data)
    }
    fetchDefaultLocation()
  },[])
  
  async function search() {
   
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${loaction}&units=Metric&appid=${API_key}`
    try{
      const response=await axios.get(url)
      if(response.data.cod!==200){
        setData({notFound:true})
      }else{
        setData(response.data)
        setLocation("")
      }
      
    }    

    catch(error){
      if(error.response &&error.response.status==404){
        setData({notFound:true})
      }
      else{
        console.log("An unexpected error occurred")
      }
    }
  }
  function handleInptchange(e){
      setLocation(e.target.value)
  }
  function getWeathericon(weatherType){
          switch(weatherType){
            case "Clear":
            return <i className='bx bxs-sun text-[#ffc87c] '></i>
            case "Cloud":
            return <i className='bx bxs-cloud text-[#fff]'></i>
            case "Rain":
            return <i className='bx bxs-rain text-[#5fd1f9]' ></i>
            case "Thunderstrom":
            return <i className='bx bxs-cloud-lightning text-[#154abd]'></i>
            case "Snow":
            return <i className='bx bxs-snow text-[#52e5e7]'></i>
            case "Haze": 
            case "Mist" : 
            return <i className='bx bxs-cloud text-[#fff]'></i>
            default:
            return <i className='bx bxs-cloud text-[#fff]'></i>
  }

  }
  const  handleKeyDown=(e)=>{
    if(e.key=="Enter"){
      search()
    } 
}
  
  return (
    <div className='pt-4  pl-4 pr-4 pb-4 flex flex-col justify-center items-center gap-y-1 w-[100%] min-w-[28rem] h-[45%] bg-[#111214] rounded-2xl '>

      <div className='flex flex-col gap-y-4'>
        <div className='flex  items-center gap-x-4'>
          <i className="fa-solid fa-location-dot text-[2.5rem] text-[#ddd]"></i>
             <div style={{fontFamily:'Comfortaa,sans-serif',
                          fontSize:"1.8rem",
                          fontWeight:"bold",
                          color:"#fff"
             }}>{data.name}</div> 
             </div>  
             <div className='relative' >
              <input 
              onKeyDown={handleKeyDown}
              placeholder='Enter Location'
               value={loaction}
              onChange={handleInptchange}
              style={{width:"clamp(15rem,14cqi,25rem",
                             height:"4rem",
                             border:"none",
                             backgroundColor:"transparent",
                             borderBottom:"0.1rem solid #aaa",
                             fontSize:"1.5rem",
                             color:"#ddd"
              }}

               type="text" />
              <i onClick={search}
              className="fa-solid fa-magnifying-glass absolute top-[50%] transla-y-[-50%] right-4 "></i>
              </div>   
       
       
      </div>
      {data.notFound ?(
        <div style={{fontFamily:"Comfortaa",
          fontSize:"2rem",
          color:"#ddd",}}
        >Not Found </div> ):
        (
          <div className='flex flex-col items-center gap-y-8'>
        {data.weather && data.weather[0] && getWeathericon(data.weather[0].main)}
        <div style={{fontFamily:"Comfortaa",
                      fontSize:"2rem",
                      color:"#ddd",

        }}>{data.weather ? data.weather[0].main:null}</div>
        <div  style={{fontFamily:"Comfortaa",
                      fontSize:"2rem",
                      color:"#ddd",
                      
        }}>{data.main ? `${Math.floor(data.main.temp)}celsius` :null}</div>
      </div>
        )
        }
      
    </div>
  )
}

export default Weather