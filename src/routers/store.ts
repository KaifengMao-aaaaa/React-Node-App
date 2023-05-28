import express, { json } from 'express'
import {storeAddType, storeAddAmout, storeListAll, storeAllType} from '../wrapfunctions/store';
const router = express.Router()

router.get("/listall", async (req, res, next) => {
  try {
    const result = await storeListAll()
    res.json({storeList: result})
  } catch(e) {
    next(e)    
  }
});
router.get("/allType", async (req, res, next) => {
  try {
    const result = await storeAllType()
    res.json({allMaterialType: result})
  } catch(e) {
    next(e)    
  }
});
router.post("/add",async (req, res, next) => {
  const {materialName,amount} = req.body
  try {
    res.json(await storeAddAmout(materialName, amount))
  } catch(e) {
    next(e)
  }
});
router.post("/addType",async(req, res, next) => {
  const {materialName, unit, unitPrice} = req.body
  try {
    res.json(await storeAddType(materialName, unit, unitPrice))
  } catch(e) {
    next(e)
  }
  
});
export default router