import { sessionUserToken } from "../../src/dtos/auth";

declare global {
	namespace Express {
	  interface Request {
        user?: sessionUserToken;
		ctx?: Record<string, any>;
		ctxId?: string;
		locals: Record<string, any>;
      }
	}
}

export {};
