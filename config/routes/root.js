import express from 'express';

import RootController from '../../app/controllers/RootController';
import _m from '../../app/utils/middlewares';

const router = express.Router();

router.all(_m.controllerBase);
router.get('/', RootController.all);

export default router;
