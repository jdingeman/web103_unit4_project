import express from 'express'
import BuildsController from '../controllers/builds.js'

const router = express.Router()

router.get('/', BuildsController.getBuilds)
router.get('/:buildId', BuildsController.getBuildById)
router.post('/', BuildsController.createBuild)
router.delete('/:buildId', BuildsController.deleteBuild)
router.patch('/:buildId', BuildsController.updateBuild)

export default router