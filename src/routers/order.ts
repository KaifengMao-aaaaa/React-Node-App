import express from 'express';
import { editOrderDescription, orderCreate, orderListAll, orderDetail, orderEditStatus, orderEditDeadline, orderEditClient, editProductAmout, checkStatus } from '../wrapfunctions/order';

const router = express.Router();

router.get('/detail', async (req, res, next) => {
  const orderId = Number(req.query.orderId);
  const result = await orderDetail(orderId);
  try {
    res.json(result);
  } catch (e) {
    next(e);
  }
});
router.get('/checkStatus', async (req, res, next) => {
  const orderId = Number(req.query.orderId);
  try {
    res.json(await checkStatus(orderId));
  } catch (e) {
    next(e);
  }
});
router.get('/listAll', async (req, res, next) => {
  try {
    res.json(await orderListAll());
  } catch (e) {
    next(e);
  }
});
router.put('/editStatus', async(req, res, next) => {
  const { orderId, status } = req.body;
  try {
    res.json(await orderEditStatus(orderId, status));
  } catch (e) {
    next(e);
  }
});

router.put('/editDeadline', async(req, res, next) => {
  const { orderId, deadline } = req.body;
  try {
    res.json(await orderEditDeadline(orderId, deadline));
  } catch (e) {
    next(e);
  }
});
router.put('/editClient', async (req, res, next) => {
  const { orderId, client } = req.body;
  try {
    res.json(await orderEditClient(orderId, client));
  } catch (e) {
    next(e);
  }
});
router.put('/editProductAmount', async (req, res, next) => {
  const { orderId, amount, row } = req.body;
  console.log(orderId);
  try {
    res.json(await editProductAmout(orderId, amount, row));
  } catch (e) {
    console.log(e);
    next(e);
  }
});
router.put('/editStartDate', (req, res) => {
  console.log(req.body);
});
router.put('/editDescription', async (req, res, next) => {
  const { orderId, description } = req.body;
  try {
    res.json(await editOrderDescription(orderId, description));
  } catch (e) {
    next(e);
  }
});
router.post('/create', async (req, res, next) => {
  const { userId, description, client, deadline, products, unitPrice } = req.body;
  const createTime = new Date();
  const endTime = new Date(Date.parse(deadline));
  try {
    res.json(await orderCreate(userId, description, client, createTime, endTime, products, unitPrice));
  } catch (e) {
    next(e);
  }
});
export default router;
