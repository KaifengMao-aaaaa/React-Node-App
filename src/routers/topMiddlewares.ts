import express from 'express'
import { TokenCheckMiddleware} from '../wrapfunctions/middlewares'
import { encrypt,decrypt,encryptForOutput } from '../wrapfunctions/helpers'
const router = express.Router()
// router.use((req,res,next) => {
//     if (['GET','PUT'].includes(req.method)) {
//         req.query.productId = req.query.productId ? decrypt(req.query.productId) : undefined
//         req.query.orderId = req.query.orderId ? decrypt(req.query.orderId) : undefined
// 		console.log('1',req.query.orderId)
//     } else if (['DELETE', 'GET'].includes(req.method)) {
//         req.body.productId = req.body.productId ? decrypt(req.query.productId) : undefined
//         req.body.orderId = req.body.orderId ? decrypt(req.query.orderId) : undefined
// 		console.log('2',req.body.orderId)
//     }

//     next()
// })
router.use(async (req,res,next) => {
	if (['/user/login','/clear', '/user/register', '/user/sendCode', '/user/retrievePassword'].includes(req.url.split('?')[0])) {
		next()
		return
	} else if (['/user/logout'].includes(req.url.split('?')[0])) {
		req.query.token = req.header('token')
		next()
		return
	}
	console.log(req.url)
	try {
		let token = req.header('token')
		const {userId} = await TokenCheckMiddleware(token)
		if (['GET', 'DELETE'].includes(req.method)) {
		req.query.userId = userId
		} else if (['PUT','POST'].includes(req.method)) {
		req.body.userId = userId
		} 
		next()
	} catch(e) {
		next(e)
	}
})
export default router