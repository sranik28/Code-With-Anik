// export type TUserName = {
//   firstName: string;
//   middleName: string;
//   lastName: string;
// };

export type TUser = {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
};
