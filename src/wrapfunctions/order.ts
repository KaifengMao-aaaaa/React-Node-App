import { del,directQuery, insert, update, randomNumber, search, getOrderById, regularizationPatternTest, getProductById, commitTransaction, startTransaction, rollbackTransaction } from './helpers';
import { errorSender } from '../errors';
export async function orderDetail(orderId: number) {
  if (!getOrderById(orderId)) {
    errorSender('orderErrors', 'NOT_EXISTED_ORDER');
  }
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
  const results = await directQuery(`SELECT ROW_NUMBER() OVER (ORDER BY orders.ID) AS id,orders.ID as orderId,DATE_FORMAT(orders.time, '%Y/%m/%d') as startDate,DATE_FORMAT(orders.deadlineTime, '%Y/%m/%d') as deadline,client,users.name as userName,status, orderPrice
          FROM orders
          Join users 
          On users.ID = orders.creatorId;`, []);
  return { ordersList: results };
}

export async function orderCreate(creatorId: number, description: string, client: string, createTime: Date, deadline: Date, products: {productName: string, amount: number}[], orderPrice: number) {
  if (!regularizationPatternTest(client, /^[a-zA-Z0-9\u4E00-\u9FFF]*$/)) {
    errorSender('orderErrors', 'INVALID_CLIENT_NAME');
  }
  if (deadline < createTime) {
    errorSender('orderErrors', 'INVALID_DEADLINE');
  }
  if (orderPrice <= 0) {
    errorSender('orderErrors', 'NEGATIVE_ORDERPRICE');
  }
  for (const product of products) {
    if (product.amount <= 0) {
      errorSender('orderErrors', 'INVALID_PRODUCT_IN_ORDER');
    }
  }
  const orderId = randomNumber(10000000, 99999999);
  await insert('orders', ['ID', 'creatorID', 'description', 'client', 'time', 'deadlineTime', 'products', 'status', 'orderPrice'], [orderId, creatorId, description, client, createTime, deadline, products, '未完成', orderPrice], [6]);
  for (const product of products) {
    const productDetail = await search('products', ['materials', 'requiredProduction'], ['productName'], [product.productName]);
    for (const { materialName, amount } of productDetail[0].materials) {
      const materialDetail = await search('store', ['utilization', 'available', 'inventoryGap'], ['materialName'], [materialName]);
      let utilization = materialDetail[0].utilization;
      let available = materialDetail[0].available;
      let inventoryGap = materialDetail[0].inventoryGap;
      const requiredAmount = product.amount * amount;
      if (available >= requiredAmount) {
        available = available - requiredAmount;
        utilization += requiredAmount;
      } else {
        utilization += (available);
        inventoryGap += (requiredAmount - available);
        available = 0;
      }
      await update('store', ['utilization', 'inventoryGap', 'available'], [utilization, inventoryGap, available], ['materialName'], [materialName]);
    }
    await update('products', ['requiredProduction'], [productDetail[0].requiredProduction + product.amount], ['productName'], [product.productName]);
  }
  await insert('orderTimeStamp', ['time', 'client', 'description', 'staffId', 'orderId'], [createTime, client, '创建', creatorId, orderId]);
  return { orderId };
}

export async function orderEditClient(orderId: number, newClient: number) {
  if (!getOrderById(orderId)) {
    errorSender('orderErrors', 'NOT_EXISTED_ORDER');
  }
  if (!regularizationPatternTest(newClient, /^[a-zA-Z0-9\u4E00-\u9FFF]*$/)) {
    errorSender('orderErrors', 'INVALID_CLIENT_NAME');
  }
  await update('orders', ['client'], [newClient], ['ID'], [orderId]);
  return {};
}
export async function checkStatus(orderId: number) {
  if (!getOrderById(orderId)) {
    errorSender('orderErrors', 'NOT_EXISTED_ORDER');
  }
  const orderDetail = await search('orders', ['status'], ['ID'], [orderId]);
  if (orderDetail[0].status === '完成') {
    return { orderFinished: true };
  } else {
    return { orderFinished: false };
  }
}
export async function orderEditStatus(orderId: number, newStatus: number) {
  if (!getOrderById(orderId)) {
    errorSender('orderErrors', 'NOT_EXISTED_ORDER');
  }
  try {
    await startTransaction();
    await update('orders', ['status'], [newStatus], ['ID'], [orderId]);
    const orderDetail = await search('orders', ['products', 'client',
      'creatorId'], ['ID'], [orderId]);
    for (const product of orderDetail[0].products) {
      const productDetail = await search('products', ['materials', 'available',
        'requiredProduction'], ['productName'],
      [product.productName]);
      for (const { materialName, amount } of productDetail[0].materials) {
        const materialDetail = await search('store', ['utilization'],
          ['materialName'],
          [materialName]);
        const utilization = materialDetail[0].utilization - amount * product.amount;
        await update('store', ['utilization'], [utilization],
          ['materialName'], [materialName]);
      }
      if (productDetail[0].available < product.amount) {
        errorSender('orderErrors', 'NOT_ENOUGH_PRODUCT');
      }
      await update('products', ['requiredProduction', 'available'],
        [productDetail[0].requiredProduction - product.amount,
          productDetail[0].available - product.amount], ['productName'],
        [product.productName]);
    }
    await insert('orderTimeStamp', ['time', 'client', 'description', 'staffId', 'orderId'], [new Date(), orderDetail[0].client, '完成订单', orderDetail[0].creatorId, orderId]);
    await commitTransaction();
  } catch (e) {
    rollbackTransaction();
    throw e;
  }
  return {};
}

export async function orderEditDeadline(orderId: number, newdeadline: string) {
  const [year, month, day] = newdeadline.split('/').map(Number);
  if (new Date() < new Date(year, month - 1, day)) {
    errorSender('orderErrors', 'INVALID_DEADLINE');
  }
  const time = new Date(Date.parse(newdeadline));
  await update('orders', ['deadlineTime'], [time], ['ID'], [orderId]);
  return {};
}

export async function deleteOrder(orderId: number) {
  try {
    await startTransaction()
    const orderDetail = await search('orders', ['*'], ['ID'], [orderId]);
    for (const product of orderDetail[0].products) {
      const productDetail = await search('products', ['materials', 'requiredProduction'], ['productName'], [product.productName]);
      for (const { materialName, amount } of productDetail[0].materials) {
        const materialDetail = await search('store', ['utilization', 'available', 'inventoryGap'], ['materialName'], [materialName]);
        let utilization = materialDetail[0].utilization;
        const available = materialDetail[0].available;
        let inventoryGap = materialDetail[0].inventoryGap;
        const requiredAmount = product.amount * amount;
        const totalNeed = inventoryGap + utilization - requiredAmount;
        if (totalNeed - utilization < 0) {
          inventoryGap = 0;
          utilization = totalNeed;
        } else {
          inventoryGap = totalNeed - utilization;
        }
        await update('store', ['utilization', 'inventoryGap', 'available'], [utilization, inventoryGap, available], ['materialName'], [materialName]);
      }
      await update('products', ['requiredProduction'], [productDetail[0].requiredProduction - product.amount], ['productName'], [product.productName]);
    }
    await del('orders','ID = ?', [orderId]); 
    await insert('orderTimeStamp', ['time', 'client', 'description', 'staffId', 'orderId'], [new Date(), orderDetail[0].client, '删除', orderDetail[0].creatorID, orderId]);
    await commitTransaction()
  } catch(e) {
    await rollbackTransaction()
  }
}
export async function editProductAmout(orderId: number, newProductAmount: number, row: number) {
  if (!getOrderById(orderId)) {
    errorSender('orderErrors', 'NOT_EXISTED_ORDER');
  }
  if (newProductAmount < 0) {
    errorSender('orderErrors', 'INVALID_PRODUCT_IN_ORDER');
  }
  if (row < 0) {
    errorSender('orderErrors', 'INCORRECT_PRODUCTS_INDEX');
  }
  await directQuery(`UPDATE orders
  SET products = JSON_REPLACE(products, '$[?].amount', ?)
  where ID = ? ;`, [row, newProductAmount, orderId]);
}

export async function editOrderDescription(orderId: number, description: string) {
  await update('orders', ['description'], [description], ['ID'], [orderId]);
}
