import { Button, Input} from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useContext, useState } from 'react'
import { useForm} from 'react-hook-form'
import { LoginSchema } from '../schema/LoginSchema';
import { loginApi} from '../services/authServices';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../contexts/AuthContext';


export default function LoginPage() {

  const [isLoading,setIsLoading]=useState(false)
  const [errorMsg,setErrorMsg]=useState("")
  const {setIsLoggedIn}=useContext(authContext);
  const Navigate=useNavigate()
  const {handleSubmit,register,formState:{errors}} = useForm({
    defaultValues:{
     
      "email":"",
      "password":"",
      
    },
    resolver:zodResolver(LoginSchema),
    mode:"onBlur"
  })
  async function handleLogin(formData){
    setIsLoading(true)
    // console.log(formData);
    const data = await loginApi(formData)
    setIsLoading(false)

    if(data.message=='success'){
      setErrorMsg("")
      localStorage.setItem("token",data.token)
            setTimeout(()=>{
        setIsLoggedIn(true)
      Navigate(location.pathname=="/login" ? "/" : location.pathname)
      },1000)
      console.log(location.pathname);

    }
       else{
      setErrorMsg(data);
    }
    console.log(data);
    
    
  }
  // console.log(errors.name?.message);
  console.log(errors)
  return (
    <div>
        {/* <Navbar/> */}
      <div className="max-w-xl py-10  mx-auto my-10 px-4 rounded-xl shadow-lg">
        <h1 className='text-center mb-4'>Login Form</h1>
        <form action="" onSubmit={handleSubmit(handleLogin)}>
          <div className='flex flex-col gap-6'>
             
            <Input isInvalid={Boolean(errors.email?.message)} errorMessage={errors.email?.message}  label="Email" type="email" variant="bordered" {...register("email")} />
            
            <Input isInvalid={Boolean(errors.password?.message)} errorMessage={errors.password?.message} label="Password" type="password" variant="bordered" {...register("password") }/>
            
  

            <Button isLoading={isLoading} type="submit" color="primary" variant="bordered">
             Login
            </Button>
            {errorMsg && <p className=' rounded-xl p-2 bg-red-300 text-center text-sm'>{errorMsg}</p>}
            <p>u don't have an account <Link to={"/register"} className='text-primary-500'>create acount now</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}
