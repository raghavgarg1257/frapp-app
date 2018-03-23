import express from 'express';

import middlewares from '../../app/utils/middlewares';
import _root from './root';
import _user from './user';
import _admin from './admin';

const router = express.Router();

router.use(middlewares.applicationBase);
router.use('/', _root);
router.use('/user', _user);
router.use('/admin', _admin);

export default router;
