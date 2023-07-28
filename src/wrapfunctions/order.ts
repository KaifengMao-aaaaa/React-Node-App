import createHttpError from 'http-errors';
import { directQuery, insert, update, randomNumber, search } from './helpers';
export async function orderDetail(orderId: number) {
  const description = await search('orders', ['description'], ['ID'], [orderId]);
  const results = await directQuery(`SELECT products 
      FROM orders 
      WHERE orders.ID = ?`, [orderId]);
  const products = results[0].products;
  let index = 0;
  for (const product of products) {
    const price = await search('products', ['unitPrice', 'ID as productId'], ['productName'], [product.productName]);
    products[index].unitPrice = price[0].unitPrice;
    products[index].productId = price[0].productId;

    index++;
  }
  if (description[0].description === '') {
    description[0].description = '无';
  }
  return { orderDetail: { requiredProducts: products, description: description[0].description } };
}

export async function orderListAll() {
  try {
    const results = await directQuery(`SELECT ROW_NUMBER() OVER (ORDER BY orders.ID) AS id,orders.ID as orderId,DATE_FORMAT(orders.time, '%Y/%m/%d') as startDate,DATE_FORMAT(orders.deadlineTime, '%Y/%m/%d') as deadline,client,users.name as userName,status, orderPrice
            FROM orders
            Join users 
            On users.ID = orders.creatorId;`, []);
    return { ordersList: results };
  } catch (e) {
    throw createHttpError(403, '查询不到信息');
  }
}

export async function orderCreate(creatorId: number, description: string, client: string, createTime: Date, deadline: Date, products: {productName: string, amount: number}[], orderPrice: number) {
  const orderId = randomNumber(10000000, 99999999);
  try {
    await insert('orders', ['ID', 'creatorID', 'description', 'client', 'time', 'deadlineTime', 'products', 'status', 'orderPrice'], [orderId, creatorId, description, client, createTime, deadline, products, '未完成', orderPrice], [6]);
    for (const product of products) {
      const productDetail = await search('products', ['materials'], ['productName'], [product.productName]);
      for (const { materialName, amount } of productDetail[0].materials) {
        const materialDetail = await search('store', ['consuming', 'remaining'], ['materialName'], [materialName]);
        const consuming = materialDetail[0].consuming + (product.amount * amount);
        const remaining = materialDetail[0].remaining - (product.amount * amount);
        await update('store', ['remaining', 'consuming'], [remaining, consuming], ['materialName'], [materialName]);
      }
    }
    await insert('orderTimeStamp', ['time', 'client', 'description', 'staffId', 'orderId'], [createTime, client, '创建', creatorId, orderId]);
  } catch (e) {
    throw createHttpError(400, '更新数据库失败');
  }
  return { orderId };
}

export async function orderEditClient(orderId: number, newClient: number) {
  try {
    await update('orders', ['client'], [newClient], ['ID'], [orderId]);
    return {};
  } catch (e) {
    console.log(e);
    throw createHttpError(400, '更新客户名失败');
  }
}
export async function checkStatus(orderId: number) {
  try {
    const orderDetail = await search('orders', ['status'], ['ID'], [orderId]);
    if (orderDetail[0].status === '完成') {
      return { orderFinished: true };
    } else {
      return { orderFinished: false };
    }
  } catch (e) {
    throw createHttpError(400, '查看状态失败');
  }
}
export async function orderEditStatus(orderId: number, newStatus: number) {
  try {
    await update('orders', ['status'], [newStatus], ['ID'], [orderId]);
    const orderDetail = await search('orders', ['products', 'client', 'creatorId'], ['ID'], [orderId]);
    for (const product of orderDetail[0].products) {
      const productDetail = await search('products', ['materials'], ['productName'], [product.productName]);
      for (const { materialName, amount } of productDetail[0].materials) {
        const materialDetail = await search('store', ['consuming'], ['materialName'], [materialName]);
        const consuming = materialDetail[0].consuming - amount * product.amount;
        await update('store', ['consuming'], [consuming], ['materialName'], [materialName]);
      }
      await insert('orderTimeStamp', ['time', 'client', 'description', 'staffId', 'orderId'], [new Date(), orderDetail[0].client, '完成订单', orderDetail[0].creatorId, orderId]);
    }
    return {};
  } catch (e) {
    console.log(e);
    throw createHttpError(400, '更新状态失败');
  }
}
export async function orderEditDeadline(orderId: number, newdeadline: string) {
  try {
    const time = new Date(Date.parse(newdeadline));
    await update('orders', ['deadlineTime'], [time], ['ID'], [orderId]);
    return {};
  } catch (e) {
    console.log(e);
    throw createHttpError(400, '更新截止日期失败');
  }
}
export async function editProductAmout(orderId: number, newProductAmount: number, row: number) {
  try {
    await directQuery(`UPDATE orders
    SET products = JSON_REPLACE(products, '$[?].amount', ?)
    where ID = ? ;`, [row, newProductAmount, orderId]);
  } catch (e) {
    console.log(e);
    throw createHttpError(400, '更新产品数量失败');
  }
}

export async function editOrderDescription(orderId: number, description: string) {
  try {
    await update('orders', ['description'], [description], ['ID'], [orderId]);
  } catch (e) {
    throw createHttpError(400, '更新描述失败');
  }
}
