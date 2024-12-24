import { Schema } from "mongoose";


export type TErrorSource = {
    path: string | number;
    message: string;
  }[];

  export type TGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorSources: TErrorSource;
  };

  export type JWTuser = {
    userID: Schema.Types.ObjectId;
    role: string;
  };