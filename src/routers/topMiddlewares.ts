import express from 'express';
import { TokenCheckMiddleware } from '../wrapfunctions/middlewares';
import { rightToEndPoints } from '../setting';
const router = express.Router();

router.use(async (req, res, next) => {
  if (rightToEndPoints.publicEndPoints.includes(req.url.split('?')[0])) {
    next();
    return;
  } else if (['/user/logout'].includes(req.url.split('?')[0])) {
    req.query.token = req.header('token');
    next();
    return;
  }
  try {
    const token = req.header('token');
    const { userId } = await TokenCheckMiddleware(token);
    if (['GET', 'DELETE'].includes(req.method)) {
      req.query.userId = userId;
    } else if (['PUT', 'POST'].includes(req.method)) {
      req.body.userId = userId;
    }
    next();
  } catch (e) {
    next(e);
  }
});
export default router;
