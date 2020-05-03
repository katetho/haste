import { Request, Response } from 'express';
export declare const list: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response<any>) => Promise<void>;
export declare const mytickets: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response<any>) => Promise<void>;
export declare const taketicket: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response<any>, next: any) => Promise<void>;
export declare const outgoing: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response<any>) => Promise<void>;
