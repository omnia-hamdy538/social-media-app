import { Button, Input, Select,SelectItem} from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm} from 'react-hook-form'
import { registerSchema} from '../schema/RegisterSchema';
import { registerApi } from '../services/authServices';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [isLoading,setIsLoading]=useState(false)
  const [errorMsg,setErrorMsg]=useState("")
  const [sucessMsg,setSucessMsg]=useState("")
  const Navigate=useNavigate()
  const {handleSubmit,register,formState:{errors},reset} = useForm({
    defaultValues:{
      "name": "omnia",
      "email":"omnia1@gmail.com",
      "password":"Omnia@123",
      "rePassword":"Omnia@123",
      "dateOfBirth":"",
      "gender":"female"
    },
    resolver:zodResolver(registerSchema),
    mode:"onBlur"
  })
  async function handleRegister(formData){
    setIsLoading(true)
    // console.log(formData);
    const data = await registerApi(formData);
    
    
    setIsLoading(false)
    if(data.error){
      setErrorMsg(data);
      setSucessMsg("")
    }
    else{
      reset()
      setErrorMsg("")
      setSucessMsg(data.message)
            setTimeout(()=>{
        Navigate("/login");
      },1000)
    }
    console.log(data);
    
    
  }
  // console.log(errors.name?.message);
  console.log(errors)
  return (
    <div>
      {/* <Navbar/> */}
      <div className="max-w-xl py-10  mx-auto my-10 px-4 rounded-xl shadow-lg">
        <h1 className='text-center mb-4'>Register Page</h1>
        <form action="" onSubmit={handleSubmit(handleRegister)}>
          <div className='flex flex-col gap-6'>
              <Input isInvalid={Boolean(errors.name?.message)} errorMessage={errors.name?.message} label="Name" type="name" variant="bordered"  {...register("name")}/>
            {/* {errors.name?.message && <p>{errors.name?.message}</p>} */}
            <Input isInvalid={Boolean(errors.email?.message)} errorMessage={errors.email?.message}  label="Email" type="email" variant="bordered" {...register("email")} />
            
            <Input isInvalid={Boolean(errors.password?.message)} errorMessage={errors.password?.message} label="Password" type="password" variant="bordered" {...register("password") }/>
            
            <Input isInvalid={Boolean(errors.rePassword?.message)} errorMessage={errors.rePassword?.message} label="Confirm Password" type="password" variant="bordered" {...register("rePassword")} />
            
            <Input isInvalid={Boolean(errors.dateOfBirth?.message)} errorMessage={errors.dateOfBirth?.message} label="Date Of Birth" type="date" variant="bordered" {...register("dateOfBirth")} />
            
             <Select isInvalid={Boolean(errors.gender?.message)} errorMessage={errors.gender?.message} variant="bordered"  label="Gender" {...register("gender")}>
                <SelectItem key={"male"}>male</SelectItem>
                <SelectItem key={"female"}>female</SelectItem>
      </Select>



            {/* <Input isInvalid={Boolean(errors.name?.message)} errorMessage={errors.name?.message} label="Name" type="name" variant="bordered"  {...register("name" ,{required:"name is required",minLength:{value:3,message:"name must be at least 3 characters"},maxLength:{value:20,message:"name must be at most 20 characters"}})}/> */}
            {/* {errors.name?.message && <p>{errors.name?.message}</p>} */}
            {/* <Input isInvalid={Boolean(errors.email?.message)} errorMessage={errors.email?.message}  label="Email" type="email" variant="bordered" {...register("email",{required:"Email is required"})} />
            
            <Input isInvalid={Boolean(errors.password?.message)} errorMessage={errors.password?.message} label="Password" type="password" variant="bordered" {...register("password",{required:"Password is required"}) }/>
            
            <Input isInvalid={Boolean(errors.repassword?.message)} errorMessage={errors.rePassword?.message} label="Confirm Password" type="password" variant="bordered" {...register("repassword",{required:"Confirm Password is required"})} />
            
            <Input isInvalid={Boolean(errors.dateOfBirth?.message)} errorMessage={errors.dateOfBirth?.message} label="Date Of Birth" type="date" variant="bordered" {...register("dateOfBirth",{required:"Date Of Birth is required"}) }/>
            
             <Select isInvalid={Boolean(errors.gender?.message)} errorMessage={errors.gender?.message} variant="bordered"  label="Gender" {...register("gender",{required:"Gender is required"})}>
                <SelectItem key={"male"}>male</SelectItem>
                <SelectItem key={"female"}>female</SelectItem>
      </Select> */}
            <Button isLoading={isLoading} type="submit" color="primary" variant="bordered">
              Register
            </Button>
            {errorMsg && <p className=' rounded-xl p-2 bg-red-300 text-center text-sm'>{errorMsg}</p>}
            {sucessMsg&& <p className=' rounded-xl p-2 bg-green-800 text-center text-sm'>{sucessMsg}</p>}
              <p>Already have an account <Link to={"/login"} className='text-primary-500'>login now</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}
