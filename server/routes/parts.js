import express from 'express'
import PartsController from '../controllers/parts.js'

const router = express.Router()

router.get('/cases', PartsController.getCases)
router.get('/cases/:caseId', PartsController.getCaseById)
router.get('/cpus', PartsController.getCPUs)
router.get('/cpus/:cpuId', PartsController.getCPUById)
router.get('/gpus', PartsController.getGPUs)
router.get('/gpus/:gpuId', PartsController.getGPUById)
router.get('/motherboards', PartsController.getMotherboards)
router.get('/motherboards/:motherboardId', PartsController.getMotherboardById)
router.get('/rams', PartsController.getRAMs)
router.get('/rams/:ramId', PartsController.getRAMById)
router.get('/storages', PartsController.getStorages)
router.get('/storages/:storageId', PartsController.getStorageById)

export default router