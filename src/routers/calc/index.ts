import { Router } from 'express';
import { PATH } from '../../constants';

const router = Router();


router.get(
	'/calc',
	(req, res) => {
		res.render("dashboard/calc/index");
	}
);

router.get(
	'/calc/coverage',
	(req, res) => {
		res.render("dashboard/calc/coverage/index");
	}
);

router.get(
	'/calc/shipping',
	(req, res) => {
		res.render("dashboard/calc/shipping/index");
	}
);

export default router;