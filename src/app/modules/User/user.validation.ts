import { z } from 'zod';

// Define Zod schema for the nested UserName object
// const UserNameValidationSchema = z.object({
//   firstName: z.string().nonempty('First name is required'),
//   middleName: z.string().optional(), // Optional middle name
//   lastName: z.string().nonempty('Last name is required'),
// });

// Define Zod schema for the User object
const UserValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty('Name is required'),
    email: z
      .string()
      .nonempty('Email is required')
      .email('Invalid email format'),
    password: z.string().nonempty('Password is required'),
    role: z.enum(['admin', 'user']).default('user'),
    isBlocked: z.boolean().optional().default(false),
  }),
});


const   loginValidationSchema = z.object({
  body: z.object({
      id: z.string({
          required_error: 'Id is required',
      }),
      password: z.string({
          required_error: 'Password is required',
      }),
  }),
});

export const UserValidation = {
    UserValidationSchema,
    loginValidationSchema
};
