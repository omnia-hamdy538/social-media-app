import { createContext, useEffect, useState } from "react";
import { getUserDataApi } from "../services/authServices";





export const authContext=createContext();

export default function AuthContextProvider({children}){
    const[isLoggedIn,setIsLoggedIn]=useState(localStorage.getItem("token")!=null)
    const[userData,setUserData]=useState();
    async function getUserData(){
        const response = await getUserDataApi();
        if(response.message=="success")
        {
            setUserData(response.user)
        }
        console.log(response);
        
    }
    useEffect(()=>{
        if(isLoggedIn)
        {
        getUserData();
        }
        else{
            setUserData(null)
        }

    },[isLoggedIn])
    return <authContext.Provider value={{isLoggedIn,setIsLoggedIn,userData,setUserData}}>
        {children}
    </authContext.Provider>
}