import { Router } from 'express';
import { PATH } from '../../constants';

const router = Router();

router.get(
	'/',
	(req, res) => {
		return res.redirect(PATH.calc);
		// res.render("dashboard/index");
	}
);

router.get(
	'/requests',
	(req, res) => {
		return res.redirect(PATH.calc);
		// res.render("dashboard/requests");
	}
);

router.get(
	'/users',
	(req, res) => {
		return res.redirect(PATH.calc);
		// res.render("dashboard/users");
	}
);

export default router;