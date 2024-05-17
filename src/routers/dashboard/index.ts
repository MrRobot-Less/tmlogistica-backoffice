import { Router } from 'express';
import { PATH } from '../../constants';
import authRequiredMiddleware from '../../middlewares/auth-required';

const router = Router();
router.use(authRequiredMiddleware);

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