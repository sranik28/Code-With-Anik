import { Schema, model, Document } from 'mongoose';
import { TUser, TUserName } from './user.interface';


const UserNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true },
  middleName: { type: String, default: '' },
  lastName: { type: String, required: true },
});

const UserSchema = new Schema<TUser>(
  {
    name: {
      type: UserNameSchema,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }, // Automatically manage createdAt and updatedAt fields
);

// Create and export the User model
export const User = model<TUser>('User', UserSchema);
