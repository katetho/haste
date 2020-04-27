import { Request, Response } from 'express';
export declare const getRegister: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response<any>) => Promise<void>;
export declare const postRegister: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response<any>) => Promise<void>;
export declare const getSignin: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response<any>) => Promise<void>;
export declare const postSignin: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response<any>) => Promise<void>;
export declare const forgotPassword: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response<any>) => Promise<void>;
export declare const signout: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response<any>) => void;
