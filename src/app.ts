import express from 'express'
import pool from './database'
const PORT = process.env.PORT || 5000;
import orderRouter from './routers/order'
import productRouter from './routers/product'
import storeRouter from './routers/store'
import userRouter from './routers/user'
import {CREATEALLABLE,DROPALLTABLE} from './query'
const app = express();

app.use(express.json())
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
app.get("/orders/details", (req, res) => {
  res.json({orders:[{id:1,date:'16 Mar, 2019',name:'kaifeng',shipTo:'he',paymentMethod:'VISA',amount:12, good:12}]});
});

app.get("/material/type", (req, res) => {
  res.json({materialsType:[{material: 'fish', unit: 'kg'}, {material: 'apple', unit: 'g'}]});
});

app.use((err, req, res, next) => {
  res.status(err.status||500).send(err.message);
});
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});