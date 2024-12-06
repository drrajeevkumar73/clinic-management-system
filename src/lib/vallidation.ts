import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const signupSchema = z.object({
  displayname: requiredString.max(20, "Must be at least 20 characters"),
  email: requiredString.email("Invalid email"),
  dipartment: requiredString,
  passwordHash: requiredString.min(8, "Must be at least 8 characters")
});

export type SignupValues = z.infer<typeof signupSchema>;

export const loginSchema = z
  .object({
    email: requiredString, 
    passwordHash: requiredString,
  })

export type LoginValues = z.infer<typeof loginSchema>;


