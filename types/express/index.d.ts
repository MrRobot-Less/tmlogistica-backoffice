import { sessionUserToken } from "../../src/dtos/auth";

declare global {
	namespace Express {
	  interface Request {
        user?: sessionUserToken;
      }
	}
}

export {};
