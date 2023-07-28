import express from 'express';
const router = express.Router();
router.use((req, res, next) => {
  console.log('end');

  next();
});

export default router;
