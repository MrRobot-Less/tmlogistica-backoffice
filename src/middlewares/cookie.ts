import { NextFunction, Request, Response } from "express"

export default function cookieMiddleware(req: Request, res: Response, next: NextFunction) {
	const tokenCookie = req.session.user?.token;
	if (!tokenCookie) return next();
	req.headers.authorization = 'Bearer '+ tokenCookie;
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	next();
}