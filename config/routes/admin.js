import express from 'express';

import AdminController from '../../app/controllers/AdminController';
import _m from '../../app/utils/middlewares';

const router = express.Router();

router.all(_m.controllerBase);

router.get('/:id', [_m.getToken, _m.isAdmin], AdminController.single);
router.post('/', AdminController.create);
router.post('/login', AdminController.login);

export default router;
