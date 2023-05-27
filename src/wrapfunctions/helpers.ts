import bcrypt from 'bcrypt';
import crypto from 'crypto';
import pool from "../database";
export async function insert(table: string, params : string[], values: (any)[]) {
    const fields = params.join(',')
    const placeholders = '?,'.repeat(params.length)
    console.log(`INSERT INTO ${table} (${fields}) VALUES(${placeholders.slice(0,-1)});`)
    await pool.query(`INSERT INTO ${table} (${fields}) VALUES(${placeholders.slice(0,-1)});`, values)

}
export async function update(table: string,updateFields: string[], updateValues: (number|string)[] ,conditionFields: string[], conditionValues: (any)[]) {
    const formatCoditions = conditionFields.map((condition) => `${condition} = ?`)
    const formatUpdates = updateFields.map((field) => `${field} = ?`)
    await pool.query(`UPDATE ${table}
        SET ${formatUpdates.join(',')}
        WHERE ${formatCoditions.join(',')};`
    ,updateValues.concat(conditionValues)) 
}
export async function search(table: string,getFields: string[] ,conditionFields: string[], conditionValues: any[]) {
    const formatCoditions = conditionFields.map((condition) => `${condition} = ?`)
    const fields = getFields.join(',')
    const conditions = formatCoditions.length > 0 ? `WHERE ${formatCoditions.join(',')}` : ''
    console.log(`SELECT ${fields} FROM ${table} ${conditions}`)
    const [results] = await pool.query(`SELECT ${fields} FROM ${table} ${conditions}`, conditionValues)
    return results
}
export async function checkPassword(hash: string, password: string): Promise<boolean> {
    if (bcrypt.compare(hash, password)) {
        return true
    } else {
        return false
    }

}

export function randomNumber(min: number, max: number) {
    return crypto.randomInt(min, max); 
}