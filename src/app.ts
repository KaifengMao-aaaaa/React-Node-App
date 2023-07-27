import express from 'express'
import pool from './database'
const PORT = process.env.PORT || 5000;
import orderRouter from './routers/order'
import productRouter from './routers/product'
import { ordersTimeStamp } from './wrapfunctions/orders';
import storeRouter from './routers/store'
import userRouter from './routers/user'
import topMiddlewares from './routers/topMiddlewares'
import bottomMiddlewares from './routers/bottomMiddlewares'
import {CREATEALLABLE,DROPALLTABLE} from './query'
import { ordersDetail } from './wrapfunctions/orders';
const app = express();

app.use(express.json())
app.use('/',topMiddlewares)

app.use('/order',orderRouter)
app.use('/product', productRouter)
app.use('/store', storeRouter)
app.use('/user', userRouter)

app.get('/clear', async (req,res, next) => {
		try {
			await pool.query(DROPALLTABLE)
			await pool.query(CREATEALLABLE)
		} catch(e) {
			next(e)
		}
		res.json({})
})
app.get("/orders/details",async (req, res, next) => {
	try {
		const orders = await ordersDetail();
		res.json(orders)
	} catch(e) {
		next(e)
	}
});

app.get("/material/type",async (req, res,next) => {
  res.json({materialsType:[{material: 'fish', unit: 'kg'}, {material: 'apple', unit: 'g'}]});
});
app.get("/orders/timeStamp",async (req, res, next) => {
	try {
  		res.json(await ordersTimeStamp());
	} catch(e) {
		next(e)
	}
});
app.use('/',bottomMiddlewares)
app.use((err, req, res, next) => {
  res.status(err.status||500).send(err.message);
});
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});