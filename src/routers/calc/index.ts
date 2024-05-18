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
		CalcService.shipping.getAll((error, shippings) => {
			res.render("dashboard/calc/shipping/index", { shippings });
		});
	}
);

router.get(
	'/calc/shipping/add',
	(req, res) => {		
		res.render("dashboard/calc/shipping/[id]");
	}
);

router.post(
	'/calc/shipping/add',
	(req, res) => {		
		CalcService.shipping.create(req.body, (error, shipping) => {
			if (error || !shipping) {
				req.flash('error_msg', error?.message || 'Não foi possível salvar essa cobertura.');
				return res.redirect('/dashboard/calc/shipping');
			}

			req.flash('success_msg', 'Cobertura salva com sucesso!');
			res.redirect('/dashboard/calc/shipping/' + shipping?._id.toString())
		});
	}
);

router.get(
	'/calc/shipping/:id',
	(req, res) => {
		CalcService.shipping.getById(req.params.id, (_, shipping) => {
			if (!shipping) return res.redirect(req.originalUrl);
			res.render("dashboard/calc/shipping/[id]", { shipping });
		});
	}
);

router.post(
	'/calc/shipping/:id',
	(req, res) => {		
		CalcService.shipping.update(req.params.id, req.body, (error, shipping) => {
			if (error || !shipping) {
				req.flash('error_msg', error?.message || 'Não foi possível salvar esse envio.');
				return res.redirect('/dashboard/calc/shipping');
			}
			req.flash('success_msg', 'Envio salvo com sucesso!');
			res.redirect('/dashboard/calc/shipping/' + shipping?._id.toString())
		});
	}
);

router.get(
	'/calc/shipping/:id/delete',
	(req, res) => {
		CalcService.shipping.deleteById(req.params.id, (error) => {
			if (error) {
				req.flash('error_msg', error.message);
			} else {
				req.flash('success_msg', 'Envio removida com sucesso!');
			}
			res.redirect('/dashboard/calc/shipping');
		});
	}
);

export default router;