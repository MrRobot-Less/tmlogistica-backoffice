import { Router } from 'express';
import { AuthService } from './service'; 

const router = Router();

router.get(
	'/',
	(req, res) => {
		res.render("login");
	}
);

router.post(
	'/',
	(req, res, next) => {
		AuthService.authenticate({email: req.body.email, password: req.body.password}, (err, userObject) => {
			if (err) { return next(err); }
			res.send('access granted.');
		});
	}
);

export default router;