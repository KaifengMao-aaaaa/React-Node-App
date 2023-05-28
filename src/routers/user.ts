import express, { json } from 'express'
import { userRegister, login, userListAll } from '../wrapfunctions/user';
const router = express.Router()

router.get("/listall",async (req, res, next) => {
  try {
    res.json(await userListAll())
  } catch(e) {
    console.log(e)
    next(e)
  }
});
router.get("/login",async (req,res,next) => {
    console.log(req.query)
    const {email, password} = req.query
    console.log(email, password)
    try {
        res.json(await login(String(email),String(password)))
    } catch(e) {
        next(e)
    }
    
})
router.post("/register",async (req,res, next) => {
    const {name, email, password} = req.body
    const result = await userRegister(name, email, password)
    try {
        res.json(result)
    } catch(e) {
        next(e)
    }

})
export default router