import { pool } from '../config/database.js'

const getBuilds = async (req, res) => {
    try {
        const selectQuery = 'SELECT * FROM builds ORDER BY id ASC'
        const results = await pool.query(selectQuery)
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json( { error: error.message })
    }
}

const getBuildById = async (req, res) => {
    try {
        const selectQuery = `
            SELECT b.id AS build_id, b.name, b.price,
                json_build_object('id', ca.id, 'name', ca.name, 'price', ca.price, 'image', ca.imageurl) AS case,
                json_build_object('id', c.id, 'name', c.name, 'price', c.price, 'image', c.imageurl) AS cpu,
                json_build_object('id', g.id, 'name', g.name, 'price', g.price, 'image', g.imageurl) AS gpu,
                json_build_object('id', m.id, 'name', m.name, 'price', m.price, 'image', m.imageurl) AS motherboard,
                json_build_object('id', r.id, 'name', r.name, 'price', r.price, 'image', r.imageurl) AS ram,
                json_build_object('id', s.id, 'name', s.name, 'price', s.price, 'image', s.imageurl) AS storage
            FROM builds b
            JOIN cases ca ON b.case_id = ca.id
            JOIN cpus c ON b.cpu_id = c.id
            JOIN gpus g ON b.gpu_id = g.id
            JOIN motherboards m ON b.motherboard_id = m.id
            JOIN rams r ON b.ram_id = r.id
            JOIN storages s ON b.storage_id = s.id
            WHERE b.id=$1
        `

        const buildId = req.params.buildId
        const results = await pool.query(selectQuery, [buildId])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json( { error: error.message })
    }
}

const createBuild = async (req, res) => {
    try {
        const { name, price, case_id, cpu_id, gpu_id, motherboard_id, ram_id, storage_id } = req.body
        const query = `
            SELECT
                c.price AS case_price,
                cpu.price AS cpu_price,
                gpu.price AS gpu_price,
                motherboard.price AS motherboard_price,
                ram.price AS ram_price,
                storage.price AS storage_price
            FROM cases c
            JOIN cpus cpu ON cpu.id = $2
            JOIN gpus gpu ON gpu.id = $3
            JOIN motherboards motherboard ON motherboard.id = $4
            JOIN rams ram ON ram.id = $5
            JOIN storages storage ON storage.id = $6
            WHERE c.id = $1
        `;

        const { rows } = await pool.query(query, [case_id, cpu_id, gpu_id, motherboard_id, ram_id, storage_id])

        if (rows.length === 0) return res.status(404).json({ error: 'Invalid part IDs' });

        const totalPrice = rows[0].case_price + rows[0].cpu_price + rows[0].gpu_price + rows[0].motherboard_price + rows[0].ram_price + rows[0].storage_price;
        const results = await pool.query(`
            INSERT INTO builds (name, price, case_id, cpu_id, gpu_id, motherboard_id, ram_id, storage_id)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *`,
        [name, totalPrice, case_id, cpu_id, gpu_id, motherboard_id, ram_id, storage_id])

        res.status(201).json(results.rows[0])
    } catch (error) {
        res.status(409).json( { error: error.message })
    }
}

const updateBuild = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { name, price, case_id, cpu_id, gpu_id, motherboard_id, ram_id, storage_id } = req.body
        const results = await pool.query(`
            UPDATE builds SET name = 1, price = $2, case_id = $3, cpu_id = $4, gpu_id = $5, motherboard_id = $6, ram_id = $7, storage_id = $8 WHERE id = $9`,
            [name, price, case_id, cpu_id, gpu_id, motherboard_id, ram_id, storage_id, id]
        )
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json( { error: error.message })
    }
}

const deleteBuild = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('DELETE FROM builds WHERE id = $1', [id])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json( { error: error.message })
    }
}

export default {
    getBuilds,
    getBuildById,
    createBuild,
    updateBuild,
    deleteBuild
}