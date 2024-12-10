import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const signupSchema = z.object({
  displayname: requiredString.max(20, "Must be at least 20 characters"),
  email: requiredString.email("Invalid email"),
  dipartment: requiredString,
  passwordHash: requiredString.min(8, "Must be at least 8 characters"),
});

export type SignupValues = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: requiredString,
  passwordHash: requiredString,
});

export type LoginValues = z.infer<typeof loginSchema>;

export const formSchema = z.object({
  content: z.string().trim(),
});
export type FormValue = z.infer<typeof formSchema>;

export const calenderSchema = z.object({
  monthname: requiredString,
});

export type CalederValue = z.infer<typeof calenderSchema>;

export const serchSchema = z.object({
  username: requiredString,
  monthname: requiredString,
});

export type SerchValue = z.infer<typeof serchSchema>;

export const addtaskSchema = z.object({
  username:requiredString,
  task1: requiredString,
  task2: z.string().trim(),
  task3: z.string().trim(),
  task4: z.string().trim(),
  task5: z.string().trim(),
  task6: z.string().trim(),
  task7: z.string().trim(),
  task8: z.string().trim(),
  task9: z.string().trim(),
  task10: z.string().trim(),
  task11: z.string().trim(),
  task12: z.string().trim(),
  task13: z.string().trim(),
  task14: z.string().trim(),
  task15: z.string().trim(),
  task16: z.string().trim(),
  task17: z.string().trim(),
  task18: z.string().trim(),
  task19: z.string().trim(),
  task20: z.string().trim(),
});

export type AddtaskValue = z.infer<typeof addtaskSchema>;
