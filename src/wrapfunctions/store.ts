import {insert, randomNumber, search,update} from './helpers'
import createHttpError, { CreateHttpError } from 'http-errors'
export async function storeAddType(materialName: string) {
    await insert('store',['materialName','time','consuming', 'remaining'], [materialName, new Date(), 0, 0])
    return {}
}

export async function storeAddAmout(materialName: string, amount: number) {
    const result = await search('store', ['remaining'],['materialName'], [materialName])
    if (result[0] === undefined) {
        throw createHttpError(400, 'material does not exist')
    }
    const remaining = result[0].remaining + amount
    await update('store', ['remaining'], [remaining], ['materialName'], [materialName])
}

export async function storeListAll() {
    const result = await search('store', ['*'],[],[])
    return result
}

export async function storeAllType() {
   return await search('store',['materialName'],[],[]) 
}