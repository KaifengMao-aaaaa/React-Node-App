import express from 'express'

const router = express.Router()
router.get("/type", (req, res) => {
  res.json({ productsType: ['good', 'bad', 'middle'] });
});
router.get("/listAll", (req, res) => {
  res.json({products: [{
    id: 1,
    product: 'good',
    unitPrice: 100,
    remaining: 12,
    unit: 'kg'
  }]});
});
router.get("/detail", (req, res) => {
  console.log('here')
  res.json({product : {materials:[{id:10,amount:11,material:'routerles',unitPrice:100,totalPrice: 10000}],description: 'hhhhhhhhhh'} });
});
router.put("/editName", (req, res) => {
  console.log(req.body)
});
router.put("/editUnit", (req, res) => {
  console.log(req.body)
});
router.put("/editUnitPrice", (req, res) => {
  console.log(req.body)
});
router.put("/editRemaining", (req, res) => {
  console.log(req.body)
});
router.put("/editMaterial", (req, res) => {
  console.log(req.body)
});
router.put("/editMaterialAmout", (req, res) => {
  console.log(req.body)
});
router.post("/create", (req, res) => {
  console.log(req.body)
});
export default router