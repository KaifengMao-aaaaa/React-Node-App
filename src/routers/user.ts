import express, { json } from 'express'
import { userRegister, login, userListAll, userSendCode, userPermissionModify, getEmailFromID, getIDFromEmail, userRetrievePassword, userEditPassword, logout } from '../wrapfunctions/user';
import dotenv from 'dotenv'
dotenv.config()
const router = express.Router()


router.get("/login",async (req,res,next) => {
    const {email, password} = req.query
    try {
        res.json(await login(String(email),String(password)))
    } catch(e) {
        next(e)
    }
})
router.delete("/logout",async (req,res,next) => {
    const {token} = req.query
    try {
        res.json(await logout(String(token)))
    } catch(e) {
        next(e)
    }
})

router.get("/listall",async (req, res, next) => {
  try {
    res.json(await userListAll())
  } catch(e) {
    console.log(e)
    next(e)
  }
});


router.post("/register",async (req,res, next) => {
    const {name, email, password, verficationCode} = req.body
    console.log(verficationCode)
    try {
        res.json(await userRegister(name, email, password, verficationCode))
    } catch(e) {
        next(e)
    }

})

router.post('/sendCode', async (req, res, next) => {
  try {
    const {email, type} = req.body
    res.json(await userSendCode(email, type))
  } catch (e) {
    next(e)
  }
})

router.put('/permission/modify', async (req, res, next) => {
  try {
    const {userId,staffId, toPermission} = req.body
    res.json(await userPermissionModify(userId,staffId,toPermission))
  } catch (e) {
    next(e)
  }
})
router.get('/getEmail', async (req, res, next) => {
  try {
    const {userId} = req.query
    res.json(await getEmailFromID(Number(userId)))
  } catch(e) {
    next(e)
  } 
})
router.get('/getID', async (req, res, next) => {
  try {
    const {email} = req.query
    res.json(await getIDFromEmail(String(email)))
  } catch(e) {
    next(e)
  } 
})
router.put('/editPassword', async (req,res,next) => {
  const {newPassword, userId, oldPassword} = req.body
  try {
    res.json(await userEditPassword(userId, newPassword, oldPassword))
  } catch(e) {
    next(e)
  }
})
router.put('/retrievePassword', async (req,res,next) => {
  const {email, verficationCode, newPassword} = req.body
  try {
    res.json(await userRetrievePassword(email, verficationCode, newPassword))
  
  } catch(e) {
    next(e)
  }
})

router.put('/editEmail', async (req, res, next) => {

})
export default router