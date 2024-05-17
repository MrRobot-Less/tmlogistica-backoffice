import { Router } from 'express';
import { PATH } from '../../constants';
import Coverage from '../../models/coverage';
import { CalcService } from './service';
import authRequiredMiddleware from '../../middlewares/auth-required';

const router = Router();
router.use(authRequiredMiddleware);

router.get(
	'/calc',
	(req, res) => {
		res.render("dashboard/calc/index");
	}
);

router.get(
	'/calc/coverage',
	(req, res) => {
		CalcService.coverage.getAll((error, coverages) => {
			CalcService.coverage.format(coverages, (_err, object) => {
				res.render("dashboard/calc/coverage/index", { coverages: object });
			});
		});
	}
);

router.get(
	'/calc/coverage/add',
	(req, res) => {		
		res.render("dashboard/calc/coverage/[id]");
	}
);

router.post(
	'/calc/coverage/add',
	(req, res) => {		
		CalcService.coverage.create(req.body, (error, coverage) => {
			if (error || !coverage) {
				req.flash('error_msg', error?.message || 'Não foi possível salvar essa cobertura.');
				return res.redirect('/dashboard/calc/coverage');
			}

			req.flash('success_msg', 'Cobertura salva com sucesso!');
			res.redirect('/dashboard/calc/coverage/' + coverage?._id.toString())
		});
	}
);

router.get(
	'/calc/coverage/:id',
	(req, res) => {
		CalcService.coverage.getById(req.params.id, (_, coverage) => {
			if (!coverage) return res.redirect(req.originalUrl);
			CalcService.coverage.format(coverage, (_err, object) => {
				res.render("dashboard/calc/coverage/[id]", { coverage: object });
			});
		});
	}
);

router.post(
	'/calc/coverage/:id',
	(req, res) => {		
		CalcService.coverage.update(req.params.id, req.body, (error, coverage) => {
			if (error || !coverage) {
				req.flash('error_msg', error?.message || 'Não foi possível salvar essa cobertura.');
				return res.redirect('/dashboard/calc/coverage');
			}
			req.flash('success_msg', 'Cobertura salva com sucesso!');
			res.redirect('/dashboard/calc/coverage/' + coverage?._id.toString())
		});
	}
);

router.get(
	'/calc/coverage/:id/delete',
	(req, res) => {
		CalcService.coverage.deleteById(req.params.id, (error) => {
			if (error) {
				req.flash('error_msg', error.message);
			} else {
				req.flash('success_msg', 'Cobertura removida com sucesso!');
			}
			res.redirect('/dashboard/calc/coverage');
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