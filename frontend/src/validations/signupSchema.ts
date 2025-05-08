import { z } from "zod";

const phoneReg = /^(\+98|0|0098)?9\d{9}$/;

export const schema = z.object({
  name: z
    .string()
    .nonempty("name is required")
    .min(6, "name should be atleast 6 characters long")
    .max(30, "name should be atmost 30 characters long"),
  username: z
    .string()
    .nonempty("username is required")
    .min(5, "username should be atleast 5 characters long")
    .max(20, "username should be atmost 20 characters long")
    .regex(/^[a-zA-Z]+$/, "username should be alphabetical"),
  email: z.string().nonempty("email is required").email("invalid email"),
  phone: z
    .string()
    .nonempty("phone is required")
    .regex(phoneReg, "invalid phone number"),
  gender: z.enum(["male", "female"], {
    required_error: "gender is required",
    invalid_type_error: "gender should be male or female",
    message: "gender should be male or female",
  }),
  password: z
    .string()
    .nonempty("password is required")
    .min(8, "password should be atleast 6 characters long")
    .max(20, "password should be atmost 20 characters long")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "password should contain atleast 1 special character,one uppercase letter , one lowercase letter and numbers"
    ),
}).refine((data)=>{
  //email or password not both
  if(data.email && data.password) return false;
  return true;
})

export type SignUpSchemaType = z.infer<typeof schema>;
