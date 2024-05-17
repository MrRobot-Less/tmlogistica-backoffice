import { NextFunction, Request, Response } from "express"

export default function authRequiredMiddleware(req: Request, res: Response, next: NextFunction) {
	if (req.user) { return next(); }
	res.redirect(req.originalUrl);
}