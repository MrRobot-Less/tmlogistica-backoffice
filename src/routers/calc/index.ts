import { Router } from 'express';
import { PATH } from '../../constants';
import Coverage from '../../models/coverage';
import { CalcService } from './service';

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
		CalcService.shipping.getAll((error, coverages) => {
			CalcService.shipping.format(coverages, (_err, object) => {
				res.render("dashboard/calc/coverage/index", { coverages: object });
			});
		});
	}
);

router.get(
	'/calc/shipping',
	(req, res) => {
		res.render("dashboard/calc/shipping/index");
	}
);

export default router;