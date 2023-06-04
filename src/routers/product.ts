import express from 'express'
import {productCreate, productListAll, productEditDescription,productDetail, productAllType, productEditName, productEditUnit, productEditUnitPrice, productEditRemaining, productEditMaterialAmount} from './../wrapfunctions/product'
const router = express.Router()
router.get("/allType",async (req, res, next) => {
  try {
    res.json(await productAllType())
  } catch(e) {
    next(e)
  }
});
router.get("/listall", async (req, res, next) => {
  try {
    res.json(await productListAll());
  } catch (e) {
    next(e)
  }
});
router.get("/detail",async (req, res, next) => {
  try {
    res.json(await productDetail(Number(req.query.productId)))
  } catch(e) {
    console.log(e)
    next(e)
  }
});
router.put("/editName",async (req, res, next) => {
  const {productId, productName} = req.body
  try {
    res.json(await productEditName(productId, productName))
  } catch(e) {
    next(e)
  } 
  console.log(req.body)
});
router.put("/editUnit",async (req, res, next) => {
  const {productId, unit} = req.body
  try {
    res.json(await productEditUnit(productId, unit))
  } catch(e) {
    console.log(e)
    next(e)
  }
});
router.put("/editUnitPrice",async (req, res, next) => {
  const {productId, unitPrice} = req.body
  try {
    res.json(await productEditUnitPrice(productId, unitPrice))
  } catch(e) {
    console.log(e)
    next(e)
  }
});
router.put("/editRemaining",async (req, res, next) => {
  console.log('here')
  const {productId, remaining} = req.body
  try {
    res.json(await productEditRemaining(productId, remaining))
  } catch(e) {
    console.log(e)
    next(e)
  }
});
// router.put("/editMaterial", (req, res) => {
//   console.log(req.body)
// });
router.put("/editMaterialAmount",async (req, res, next) => {
  try {
    const {amount, productId, row} = req.body
    res.json(await productEditMaterialAmount(productId,amount, row))
  } catch (e) {
    console.log(e)
    next(e)
  }
});
router.put("/editDescription",async (req, res, next) => {
  try {
    const {description, productId} = req.body
    res.json(await productEditDescription(productId, description))
  } catch (e) {
    console.log(e)
    next(e)
  }
});
router.post("/create",async (req, res, next) => {
  try {
    const {productName, unit, unitPrice, description, materials} = req.body
    await productCreate(productName, unit,unitPrice, description, materials)
  } catch(e) {
    next(e)
  }
});
export default router