import { Router } from 'express';

const router = Router();

router.get(
	'/',
	(req, res) => {
		res.render("dashboard/index");
	}
);

router.get(
	'/calc',
	(req, res) => {
		res.render("dashboard/calc");
	}
);

router.get(
	'/requests',
	(req, res) => {
		res.render("dashboard/requests");
	}
);

router.get(
	'/users',
	(req, res) => {
		res.render("dashboard/users");
	}
);

export default router;