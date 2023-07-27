import {insert, randomNumber, search,update,directQuery } from './helpers'
import createHttpError from 'http-errors'
export async function storeAddType(userId:number,materialName: string, unit: string, unitPrice: number) {
    const result = await search('store', ['materialName'], ['materialName'], [materialName])
    if (result[0]) {
        throw createHttpError(400, '物料名字重复')
    }
    await insert('storeTimeStamp', ['time', 'alteration', 'type', 'staffId', 'description'], [new Date(), 0, materialName, userId,'创建'])
    await insert('store',['materialName','time','consuming', 'remaining','unit', 'unitPrice'], [materialName, new Date(), 0, 0, unit, unitPrice])
    return {}
}

export async function storeAddAmount(userId: number, description: string,materialName: string, amount: number) {
    const result = await search('store', ['remaining'],['materialName'], [materialName])
    if (result[0] === undefined) {
        throw createHttpError(400, '物料不存在')
    }
    const remaining = result[0].remaining + amount
    await update('store', ['remaining'], [remaining], ['materialName'], [materialName])
    await insert('storeTimeStamp', ['time', 'alteration', 'type', 'staffId', 'description'], [new Date(), amount, materialName, userId, description !== '' ? description : '无'])
}

export async function storeListAll() {
    const result = await search('store', ['*'],[],[])
    return result
}

export async function storeAllType() {
   return await search('store',['materialName', 'unit'],[],[]) 
}


export async function storeTimeStamp() {
    const results = await directQuery(`SELECT ROW_NUMBER() OVER (ORDER BY storeTimeStamp.ID DESC) AS id,DATE_FORMAT(storeTimeStamp.time, '%Y/%m/%d') as time,users.name as staffName, alteration, storeTimeStamp.description, type, description
            FROM storeTimeStamp
            Join users 
            On users.ID = storeTimeStamp.staffId`,[])
    return {storeTimeStamp:results}
}