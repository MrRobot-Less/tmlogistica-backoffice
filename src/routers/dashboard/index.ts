import { Router } from 'express';
import authRequiredMiddleware from '../../middlewares/auth-required';

const router = Router();
router.use(authRequiredMiddleware);

interface Plot2D {
	x: string[],
	y: number[]
}

router.get(
	'/',
	(req, res) => {
		let period;
		let quoteLine: Plot2D = { x: [], y: [] };
		let quoteBar: Plot2D = { x: [], y: [] };
		switch (req.query.period) {
			case 'daily': {
				period = 'daily';

				quoteLine.x = ['20', '19', '18'];
				quoteLine.y = [10, 20, 12]

				quoteBar.x = ['SP1', 'SP2'];
				quoteBar.y = [100, 56];

				break;
			} case 'weekly': {
				period = 'weekly';

				quoteLine.x = ['20/10', '10/10', '30/09'];
				quoteLine.y = [100, 200, 120]

				quoteBar.x = ['SP1', 'SP2'];
				quoteBar.y = [100, 56];

				break;
			} case 'monthly': {
				period = 'monthly';

				quoteLine.x = ['27/10', '27/09', '27/08'];
				quoteLine.y = [1000, 1231, 1241]

				quoteBar.x = ['SP1', 'SP2'];
				quoteBar.y = [1021, 1233];

				break;
			} default: {
				console.log('teste')
				return res.redirect("/dashboard?period=daily");
			}
		}

		res.render("dashboard/index", { period, quoteLine, quoteBar });
	}
);

router.get(
	'/quotation',
	(req, res) => {
		res.render("dashboard/quotation");
	}
);

export default router;