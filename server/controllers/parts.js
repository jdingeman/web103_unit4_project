import { pool } from '../config/database.js'

const getCases = async (req, res) => {
    try {
        const selectQuery = 'SELECT * FROM cases ORDER BY id ASC'
        const results = await pool.query(selectQuery)
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json( { error: error.message })
    }
}

const getCaseById = async (req, res) => {
    try {
        const selectQuery = `
            SELECT name, price, imageURL
            FROM cases
            WHERE id=$1
        `

        const caseId = req.params.caseId
        const results = await pool.query(selectQuery, [caseId])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json( { error: error.message })
    }
}

const getCPUs = async (req, res) => {
    try {
        const selectQuery = 'SELECT * FROM cpus ORDER BY id ASC'
        const results = await pool.query(selectQuery)
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json( { error: error.message })
    }
}

const getCPUById = async (req, res) => {
    try {
        const selectQuery = `
            SELECT name, price, imageURL
            FROM cpus
            WHERE id=$1
        `

        const cpuId = req.params.cpuId
        const results = await pool.query(selectQuery, [cpuId])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json( { error: error.message })
    }
}

const getGPUs = async (req, res) => {
    try {
        const selectQuery = 'SELECT * FROM gpus ORDER BY id ASC'
        const results = await pool.query(selectQuery)
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json( { error: error.message })
    }
}

const getGPUById = async (req, res) => {
    try {
        const selectQuery = `
            SELECT name, price, imageURL
            FROM gpus
            WHERE id=$1
        `

        const gpuId = req.params.gpuId
        const results = await pool.query(selectQuery, [gpuId])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json( { error: error.message })
    }
}

const getMotherboards = async (req, res) => {
    try {
        const selectQuery = 'SELECT * FROM motherboards ORDER BY id ASC'
        const results = await pool.query(selectQuery)
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json( { error: error.message })
    }
}

const getMotherboardById = async (req, res) => {
    try {
        const selectQuery = `
            SELECT name, price, imageURL
            FROM motherboards
            WHERE id=$1
        `

        const motherboardId = req.params.motherboardId
        const results = await pool.query(selectQuery, [motherboardId])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json( { error: error.message })
    }
}

const getRAMs = async (req, res) => {
    try {
        const selectQuery = 'SELECT * FROM rams ORDER BY id ASC'
        const results = await pool.query(selectQuery)
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json( { error: error.message })
    }
}

const getRAMById = async (req, res) => {
    try {
        const selectQuery = `
            SELECT name, price, imageURL
            FROM rams
            WHERE id=$1
        `

        const ramId = req.params.ramId
        const results = await pool.query(selectQuery, [ramId])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json( { error: error.message })
    }
}

const getStorages = async (req, res) => {
    try {
        const selectQuery = 'SELECT * FROM storages ORDER BY id ASC'
        const results = await pool.query(selectQuery)
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json( { error: error.message })
    }
}

const getStorageById = async (req, res) => {
    try {
        const selectQuery = `
            SELECT name, price, imageURL
            FROM storages
            WHERE id=$1
        `

        const storageId = req.params.storageId
        const results = await pool.query(selectQuery, [storageId])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json( { error: error.message })
    }
}

export default {
    getCases,
    getCaseById,
    getCPUs,
    getCPUById,
    getGPUs,
    getGPUById,
    getMotherboards,
    getMotherboardById,
    getRAMs,
    getRAMById,
    getStorages,
    getStorageById
}