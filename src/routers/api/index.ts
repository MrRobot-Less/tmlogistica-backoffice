import { Router } from 'express';
import { APIService } from './service';

const router = Router();

router.post(
	'/calculate',
	(req, res) => {
		req.body.weight = req.body.weight || '0';
		APIService.calculate.TMShipping.calc(req.body, (error, shippings) => {
			res.json({ status: error?.status || 200, shippings: shippings});
		});
		
	}
);

export default router;