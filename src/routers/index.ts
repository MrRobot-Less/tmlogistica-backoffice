import { Router } from "express";
import * as AuthRouter from "./auth";
import * as DashboardRouter from "./dashboard";
import * as CalcRouter from "./calc";

import authMiddleware from "../middlewares/auth";
import cookieMiddleware from "../middlewares/cookie";
import { PATH } from "../constants";

const router = Router();


// theses routers bellow do not need authentication
// ... Homepage, for example

// all routers below need authentication
router.use(cookieMiddleware);
router.use(authMiddleware);


router.use(PATH.login, AuthRouter.default);
router.use(PATH.dashboard, DashboardRouter.default);
router.use(PATH.dashboard, CalcRouter.default);


export default router;