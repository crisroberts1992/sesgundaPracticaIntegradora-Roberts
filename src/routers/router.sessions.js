import { Router } from 'express'
import { postSesionesController, deleteSesionesController } from '../controllers/api/sesiones.controller.js'

export const sesionesRouter = Router()

sesionesRouter.post('/', postSesionesController)
sesionesRouter.delete('/', deleteSesionesController)