import { Ticket } from '../models/Ticket';
import { Request } from 'express';
export declare const helpers: {
    displayTickets: (status: string, req: Request<import("express-serve-static-core").ParamsDictionary>, condition?: object) => Promise<Ticket[]>;
    distribute: (items: any[]) => void;
    ticketTime: (items: any[]) => void;
    encodeIDs: (items: any[]) => void;
    statusCheck: (items: any[], req: any) => void;
    ticketHandler: (items: any[], req: Request<import("express-serve-static-core").ParamsDictionary>) => void;
};
