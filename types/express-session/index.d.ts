import session from 'express-session';
import { sessionUserToken } from '../../src/dtos/auth';

declare module 'express-session' {
  export interface SessionData {
	user: sessionUserToken | null;
  }
}