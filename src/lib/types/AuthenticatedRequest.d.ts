import { Request } from "express";

export interface JwtPayload {
  sub: string;
  email: string;
  iat?: number;
  exp?: number;
  _doc?: any
}

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}