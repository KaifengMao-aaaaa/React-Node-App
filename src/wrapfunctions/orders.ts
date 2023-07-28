import { search, directQuery } from './helpers';
export async function ordersDetail() {
  const orders = await search('orders', ['ID as id', "DATE_FORMAT(orders.deadlineTime, '%Y/%m/%d') as deadline ", 'creatorID', 'client as clientName', 'status'], [], []);
  return { orders: orders };
}
export async function ordersTimeStamp() {
  const results = await directQuery(`SELECT ROW_NUMBER() OVER (ORDER BY orderTimeStamp.ID DESC) AS id,orderTimeStamp.orderId as orderId,DATE_FORMAT(orderTimeStamp.time, '%Y/%m/%d') as time,orderTimeStamp.client,users.name as staffName, orders.orderPrice, orderTimeStamp.description
            FROM orderTimeStamp
            Join users 
            On users.ID = orderTimeStamp.staffId
            Join orders
            On orders.ID = orderTimeStamp.orderId;`, []);
  return { ordersTimeStamp: results };
}
