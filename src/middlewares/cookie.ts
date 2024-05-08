import { NextFunction, Request, Response } from "express"

export default function cookieMiddleware(req: Request, res: Response, next: NextFunction) {
	const tokenCookie = req.session.user?.token;
	if (!tokenCookie) return next();
	req.headers.authorization = 'Bearer '+ tokenCookie;
	next();
}