import express from 'express';
import { PageIsAvailable, rightChecker } from '../wrapfunctions/rightCheckers';
const router = express.Router();
router.use(async (req, res, next) => {
  if (['/user/logout'].includes(req.url.split('?')[0])) {
    next();
    return;
  }
  const userId = ['GET', 'DELETE'].includes(req.method) ? req.query.userId : req.body.userId;
  try {
    await rightChecker(Number(userId), req.url);
    next();
  } catch (e) {
    next(e);
  }
});
router.get('/page/isAvailable', async (req, res, next) => {
  const { userId, section } = req.query;
  try {
    res.json(await PageIsAvailable(Number(userId), String(section)));
  } catch (e) {
    next(e);
  }
});
export default router;
