import bcrypt from 'bcrypt';
import crypto from 'crypto';
import pool from "../database";
export async function insert(table: string, params : string[], values: (any)[], JSONIndex ?: number[]) {
    let insertValues = values
    if (JSONIndex) {
        insertValues = insertValues.map((value, index) => {
            if (JSONIndex.includes(index)) {
                return JSON.stringify(value)
            }
            return value
        })
    }
    const fields = params.join(',')
    const placeholders = '?,'.repeat(params.length)
    try {await pool.query(`INSERT INTO ${table} (${fields}) VALUES(${placeholders.slice(0,-1)});`, insertValues)}
    catch(e) {console.log(e)}
}
export async function update(table: string,updateFields: string[], updateValues: any[] ,conditionFields: string[], conditionValues: (any)[]) {
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
    const [results] = await pool.query(`SELECT ${fields} FROM ${table} ${conditions}`, conditionValues)
    return results
}
// useless function
// export async function joinSearch(table1: string, table2: string, table1GetFields: string[], table2GetFields: string[],repeatFields: string[] ,ON : string = '') {
//     const table1Selected = table1GetFields.map((field) =>{
//         if (repeatFields.includes(field)) {
//             return table1 + `.${field}`
//         }
//         return field
//     })
//     const table2Selected = table2GetFields.map((field) =>{
//         if (repeatFields.includes(field)) {
//             return table1 + `.${field}`
//         }
//         return field
//     })
//     const finalSelected = table1Selected.concat(table2Selected).join(',')
//     try {console.log(`SELECT ${finalSelected} FROM ${table1} JOIN ${table2} ${ON}`)
//         const [results] = await pool.query(`SELECT ${finalSelected} FROM ${table1} JOIN ${table2} ${ON}`) 
//         return results
//     } catch(e) {
//         console.log(e)
//     }

// }
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

export async function directQuery(sql: string, params: (string|number)[]) {
    const [results]  = await pool.query(sql, params)

    return results
}

