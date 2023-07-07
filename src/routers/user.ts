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
    const {email, password} = req.query
    try {
        res.json(await login(String(email),String(password)))
    } catch(e) {
        next(e)
    }
    
})
router.post("/register",async (req,res, next) => {
    const {name, email, password} = req.body
    try {
        res.json(await userRegister(name, email, password))
    } catch(e) {
        next(e)
    }

})
export default router