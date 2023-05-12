import { Router } from 'express'
import { postUsuariosController } from '../controllers/api/usuarios.controller.js'

export const usuariosRouter = Router()

usuariosRouter.post('/', postUsuariosController)