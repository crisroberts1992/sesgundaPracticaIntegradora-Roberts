import { usuariosManager } from '../../dao/user.manager.js'

export async function usuariosView  (req, res, next)  {
    try {
        const usuarios = await usuariosManager.obtenerTodos()

        res.render('users', {
            pageTitle: 'Usuarios',
            hayUsuarios: usuarios.length > 0,
            usuarios
        })
    } catch (error) {
        next(error)
    }
}