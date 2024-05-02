import { Router } from "express";
import * as AuthRouter from "./auth";

const router = Router();

router.use('/auth', AuthRouter.default);

export default router;