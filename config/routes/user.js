import express from 'express';

import UserController from '../../app/controllers/UserController';
import _m from '../../app/utils/middlewares';

const router = express.Router();

router.all(_m.controllerBase);

router.get('/', [_m.getToken, _m.isAdmin], UserController.all);
router.get('/:id', [_m.getToken, _m.isUser, _m.isAdmin], UserController.single);
router.post('/', UserController.create);
router.put('/:id', [_m.getToken, _m.isUser, _m.isAdmin], UserController.update);
router.delete('/:id', [_m.getToken, _m.isAdmin], UserController.remove);
router.post('/login', UserController.login);

export default router;
