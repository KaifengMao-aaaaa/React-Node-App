import express, { json } from 'express'
import {storeAddType, storeAddAmount, storeListAll, storeAllType, storeTimeStamp} from '../wrapfunctions/store';
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
  const {userId, description,materialName,amount} = req.body
  try {
    res.json(await storeAddAmount(userId, description,materialName, amount))
  } catch(e) {
    next(e)
  }
});
router.post("/addType",async(req, res, next) => {
  const {userId,materialName, unit, unitPrice} = req.body
  try {
    res.json(await storeAddType(userId,materialName, unit, unitPrice))
  } catch(e) {
    next(e)
  }
  
});
router.get('/timeStamp', async (req,res,next) =>  {
  try {
    res.json(await storeTimeStamp())
  }catch(e) {
    next(e)
  }
})
export default router