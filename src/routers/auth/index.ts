import { Router } from 'express';
import { AuthService } from './service'; 
import { PATH, TIME_TO_EXPIRES } from '../../constants';

const router = Router();

router.get(
	'/',
	(req, res) => {
		if (req.user) { return res.redirect(PATH.dashboard); }
		res.render("login", { error: req.flash('error_msg') });
	}
);

router.post(
	'/',
	(req, res) => {
		AuthService.authenticate({email: req.body.email, password: req.body.password}, (err, userObject) => {
			if (err || !userObject) {
				req.flash('error_msg', 'Usuário ou senha incorreto.');
				return res.redirect(req.originalUrl);
			};
			req.session.user = userObject;
			req.session.save(() => {
				res.redirect(req.originalUrl);
			});
		});
	}
);

router.get(
	'/logout',
	(req, res) => {
		if (!req.user) { return res.redirect(PATH.login); }
		req.session.destroy(() => {
			res.redirect(PATH.login);
		});
	}
);



export default router;