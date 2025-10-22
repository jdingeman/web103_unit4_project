import { pool } from './database.js'
import './dotenv.js'
import caseData from '../data/cases.js'
import cpuData from '../data/cpus.js'
import gpuData from '../data/gpus.js'
import motherboardData from '../data/motherboards.js'
import ramData from '../data/ram.js'
import storageData from '../data/storage.js'

const createTables = async () => {

    // Drop the builds table before dropping parts
    await pool.query('DROP TABLE IF EXISTS builds')

    const tableNames = ["cases", "cpus", "gpus", "motherboards", "rams", "storages"]

    for (const table of tableNames) {
        const createTableQuery = `
            DROP TABLE IF EXISTS ${table};
            
            CREATE TABLE IF NOT EXISTS ${table}(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price NUMERIC(7,2) NOT NULL,
                imageURL VARCHAR(255) NOT NULL
            )
        `

        try {
            const res = await pool.query(createTableQuery)
            console.log(`🎉 ${table} table created successfully`)
        } catch (err) {
            console.error(`⚠️ error creating ${table} table`, err)
        }
    }

    const createBuildsTableQuery = `
        CREATE TABLE IF NOT EXISTS builds(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price NUMERIC(7,2) NOT NULL,
            case_id INT REFERENCES cases(id),
            cpu_id INT REFERENCES cpus(id),
            gpu_id INT REFERENCES gpus(id),
            motherboard_id INT REFERENCES motherboards(id),
            ram_id INT REFERENCES rams(id),
            storage_id INT REFERENCES storages(id)
        )
    `

    try {
        await pool.query(createBuildsTableQuery)
        console.log('🎉 builds table created successfully')
    } catch (err) {
        console.error('⚠️ error creating builds table', err)
    }
}

const seedTables = async () => {
    await createTables()
    const tables = {
        cases: caseData,
        cpus: cpuData,
        gpus: gpuData,
        motherboards: motherboardData,
        rams: ramData,
        storages: storageData
    }

    for (const [tableName, tableArray] of Object.entries(tables)) {
        for (const item of tableArray) {
            const insertQuery = {
            text: `INSERT INTO ${tableName} (name, price, imageURL) VALUES ($1, $2, $3)` 
        }

        const values = [
            item.name,
            item.price,
            item.imageURL
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error(`⚠️ error inserting to ${tableName}`, err)
                return
            }

            console.log(`✅ ${item.name} added successfully`)
        })
        }

    }
}

seedTables()