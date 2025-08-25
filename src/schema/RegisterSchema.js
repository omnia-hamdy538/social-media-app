import * as zod from "zod";
export const registerSchema=zod.object(
  {
  name:zod.string()
    .nonempty("Name is required")
    .min(3,"name must be at least 3 characters")
    .max(20,"name must be at most 20 characters"),
  email:zod.email()
    .nonempty("Email is required")
    .regex(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Email invalid"),
  password:zod.string()
    .nonempty("Password is required")
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,"Minimum eight characters, at least one letter, one number and one special character:"),
  rePassword:zod.string()
  .nonempty("Confirm Password  is required"),
  dateOfBirth:zod.coerce.date().refine((date)=>{
    const birthDate=date.getFullYear();
    const now=new Date().getFullYear();
    const age=now -birthDate;
    return age >=18;
  },{message:"your age must be at least 18 year"}),
  gender:zod.string()
  .nonempty("gender is required")
  .regex(/^(male|female)$/,"please, Enter your gender")

  })
  .refine((data) => data.password === data.rePassword,{message:"confirm password and password must matched", path:['rePassword']})
