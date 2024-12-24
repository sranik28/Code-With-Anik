// export type TUserName = {
//   firstName: string;
//   middleName: string;
//   lastName: string;
// };

// import { USER_ROLE } from "./user.constant";

export type TUser = {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
};


export type TLoginUser = {
  id: string;
  password: string;
};





// export type TUserRole = keyof typeof USER_ROLE;