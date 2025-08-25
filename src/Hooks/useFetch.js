import axios from 'axios'
import React, { useEffect, useState } from 'react'



export default function useFetch() {
    const [data, setData] = useState([])
    async function getData(api){
        const {data}=await axios.get(api);
        setData(data.data)
    }
    useEffect(()=>{
        getData()
    },[])
  return data
}

