import { Request, Response } from "express";
export declare const shortUrl: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
export declare const createUrl: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
