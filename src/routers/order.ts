import express from 'express'
import {} from '../query'
// const express = require('express')

const router = express.Router()


router.get("/detail", (req, res) => {
  console.log('here')
  res.json({order : {materials:[{id:1,amount:1,material:'routerle',unitPrice:100,totalPrice: 10000}],description: 'hhhhhh'} });
});
router.get("/listAll", (req, res) => {
  res.json([{
    id: 1,
    startDate: '今天',
    deadline: '明天',
    client: 'a',
    userName: 'b',
    status: 'finiished',
    amount: 12,
    unitPrice: 10
  },{
    id: 23,
    startDate: '今天',
    deadline: '明天',
    client: 'a',
    userName: 'b',
    status: 'finiished',
    amount: 12,
    unitPrice: 10
  },{
    id: 2,
    startDate: '今天',
    deadline: '明天',
    client: 'a',
    userName: 'b',
    status: 'finiished',
    amount: 12,
    unitPrice: 10
  }]);
});
router.put("/editName", (req, res) => {
  console.log(req.body)
})
router.put("/order/editStatus", (req, res) => {
  console.log(req.body)
});

router.put("/order/editUnitPrice", (req, res) => {
  console.log(req.body)
});
router.put("/order/editDeadline", (req, res) => {
  console.log(req.body)
});
router.put("/order/editMaterialAmount", (req, res) => {
  console.log(req.body)
});
router.put("/order/editClient", (req, res) => {
  console.log(req.body)
});
router.put("/order/editAmount", (req, res) => {
  console.log(req.body)
});
router.put("/order/editStartDate", (req, res) => {
  console.log(req.body)
});
router.post("/order/create", (req, res) => {
  console.log(req.body)
});
export default router
// module.exports = router