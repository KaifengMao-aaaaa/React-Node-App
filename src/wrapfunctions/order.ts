import createHttpError from 'http-errors'
import {directQuery, insert, update, randomNumber, search} from './helpers'
import pool from '../database'
export async function orderDetail(orderId: number) {
    const description = await search('orders',['description'], ['ID'], [orderId])
    const results = await directQuery(`SELECT products 
      FROM orders 
      WHERE orders.ID = ?`, [orderId] )
    const products = results[0].products
    let index = 0;
    for (const product of products) {
      const price = await search('products', ['unitPrice','ID as productId'], ['productName'], [product.productName]);
      products[index].unitPrice = price[0].unitPrice
      products[index].productId = price[0].productId

      index++; 
    }
    if (description[0].description === '') {
        description[0].description = '无'
    }
   return {orderDetail:{requiredProducts : products, description: description[0].description}} 
}

export async function orderListAll() {
    try {
        const results = await directQuery(`SELECT ROW_NUMBER() OVER (ORDER BY orders.ID) AS id,orders.ID as orderId,DATE_FORMAT(orders.time, '%Y/%m/%d') as startDate,DATE_FORMAT(orders.deadlineTime, '%Y/%m/%d') as deadline,client,users.name as userName,status
            FROM orders
            Join users 
            On users.ID = orders.creatorId;`,[])
        return {ordersList: results}    
    } catch(e) {
        console.log(e)
        throw createHttpError(400, 'failed to search date')
    }
}

export async function orderCreate(creatorId: number,description: string, client: string, createTime: Date, deadline: Date, products: {productName: string, amount: number}[], unitPrice: number) {
    const orderId = randomNumber(10000000,99999999)
    try {
        await insert('orders', ['ID','creatorID', 'description', 'client', 'time', 'deadlineTime', 'products','status'],[orderId,creatorId,description, client, createTime, deadline, products, '未完成'],[6])
    } catch (e) {
        throw createHttpError(400, 'failed to insert orders')
    }
    return {orderId}

        
}

export async function orderEditClient(orderId: number, newClient: number) {
  try {
    await update('orders', ['client'], [newClient],['ID'],[orderId])
    return {}
  } catch(e) {
    console.log(e)
    throw createHttpError(400, 'failed to edit client')
  }
}
export async function orderEditStatus(orderId: number, newStatus: number) {
  try {
    await update('orders', ['status'], [newStatus],['ID'],[orderId])
    return {}
  } catch(e) {
    console.log(e)
    throw createHttpError(400, 'failed to edit status')
  }
}
export async function orderEditDeadline(orderId: number, newdeadline: string) {
  try {
    const time = new Date(Date.parse(newdeadline))
    await update('orders', ['deadlineTime'], [time],['ID'],[orderId])
    return {}
  } catch(e) {
    console.log(e)
    throw createHttpError(400, 'failed to edit deadline')
  }
}
export async function editProductAmout(orderId: number, newProductAmount: number, row: number) {
  try {
    await directQuery(`UPDATE orders
    SET products = JSON_REPLACE(products, '$[?].amount', ?)
    where ID = ? ;`, [row,newProductAmount,orderId])
  } catch(e) {
    console.log(e)
    throw createHttpError(400, 'failed to edit ProductAmount')
  }
  
}