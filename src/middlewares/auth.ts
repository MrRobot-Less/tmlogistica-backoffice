import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken';
import { JwtPayload } from "../dtos/auth";
import { AuthService } from "../routers/auth/service";
import { PATH } from "../constants";


export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers.authorization;
	const errorHandleAuth = () => {
		if (req.originalUrl === PATH.login) return next();
		res.redirect(PATH.login);
	}

	if (!authHeader) return errorHandleAuth();

	const parts = authHeader.split(' ');
	if (!(parts.length === 2)) return errorHandleAuth();

	const [ schema, token ] = parts;
	if (!/^Bearer$/i.test(schema)) return errorHandleAuth();

	const callback : jwt.VerifyCallback<string | jwt.JwtPayload | JwtPayload> = (err, decoded) => {
		if (err) return errorHandleAuth();
		req.user = (decoded as JwtPayload);
		return next();
	}

	AuthService.validate(token, callback);
}