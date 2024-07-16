import express from 'express'
import LinksController from '../controllers/LinksControllers.js'
const LinksRouter = express.Router()

LinksRouter.get('/', LinksController.getLinks)

// LinksRouter.get('/:id', LinksController.getById)
LinksRouter.get('/:id', LinksController.redirectLink);

LinksRouter.get('/:id/clicks',LinksController.getClicksByTarget)

LinksRouter.post('/', LinksController.createLink)

LinksRouter.put('/:id', LinksController.updateLink)

LinksRouter.delete('/:id', LinksController.deleteLink)

export default LinksRouter