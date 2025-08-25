import * as zod from "zod";
export const LoginSchema=zod.object(
  {

  email:zod.email()
    .nonempty("Email is required")
    .regex(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Email invalid"),
  password:zod.string()
    .nonempty("Password is required")
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,"Minimum eight characters, at least one letter, one number and one special character:"),

  })
