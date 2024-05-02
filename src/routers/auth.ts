import { Router } from 'express';
import User from '../models/user';

const router = Router();
router.get(
	'/',
	(req, res, next) => {
		User.find({})
			.then(users => {
				res.json({ users})
			}).catch(next);
	}
);

export default router;