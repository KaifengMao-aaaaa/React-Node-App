import express, { json } from 'express'
import { userRegister } from '../wrapfunctions/register';
import login from '../wrapfunctions/login';
const router = express.Router()

router.get("/listall", (req, res) => {
  res.json({users:[
    {
      name: 'peopl1',
      id: 1
    },{
      name: 'people2',
      id: 2
    },{
      name: 'people3',
      id: 3
    },{
      name: 'people4',
      id: 5
    },{
      name: 'people5',
      id: 9
    }
  ]});
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